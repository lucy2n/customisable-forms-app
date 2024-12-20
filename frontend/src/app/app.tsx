import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login-page/login-page';
import Header from '../widgets/header/header';
import { RoutePathname } from './routes/constants';
import RegisterPage from '../pages/register-page/register-page';
import MainPage from '../pages/main-page/main-page';
import { useAppDispatch } from './routes/lib/hook';
import { useEffect } from 'react';
import { OnlyAuth, OnlyUnAuth } from './routes/protected-route';
import { getUserInformation } from '../shared/api/user';
import { loggedIn, loggedOut, setEmail, setId, setIsAdmin, setName, setSalesforceId } from '../entities/user/model/userSlice';
import CreateTemplatePage from '../pages/create-template-page/create-template-page';
import CreateFormPage from '../pages/create-form-page/create-form-page';
import AdminPage from '../pages/admin-page/admin-page';
import ProfilePage from '../pages/profile-page/profile-page';
import EditTemplatePage from '../pages/edit-template-page/edit-template-page';
import { IUser } from '../entities/user/model/user';
import Footer from '../widgets/footer/footer';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserInformation()
        .then(({ id, email, name, is_admin, salesforce_id }: IUser) => {
          if (id) dispatch(setId(id + ''));
          dispatch(setSalesforceId(salesforce_id!));
          dispatch(loggedIn());
          dispatch(setEmail(email));
          dispatch(setName(name ?? ''));
          dispatch(setIsAdmin(!!is_admin));
        })
        .catch((err) => {
          dispatch(loggedOut());
          localStorage.removeItem('token');
          console.error(err);
        });
    }
  }, [dispatch]);

  return (
    <div className="flex w-full flex justify-center flex-col w-screen min-h-screen"> 
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path={RoutePathname.homePage} element={<MainPage />} />
          <Route path={RoutePathname.loginPage} element={<OnlyUnAuth component={<LoginPage />} />} />
          <Route path={RoutePathname.registerPage} element={<RegisterPage />} />
          <Route path={RoutePathname.createTemplate} element={<OnlyAuth component={<CreateTemplatePage />} />} />
          <Route path={RoutePathname.createForm} element={<CreateFormPage />} />
          <Route path={RoutePathname.profilePage} element={<OnlyAuth component={<ProfilePage />} />} />
          <Route path={RoutePathname.editTemplate} element={<OnlyAuth component={<EditTemplatePage />} />} />
          <Route path={RoutePathname.adminPage} element={<AdminPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;