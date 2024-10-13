import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login-page/login-page';
import Header from '../widgets/header/header';
import { RoutePathname } from './routes/constants';
import RegisterPage from '../pages/register-page/register-page';
import CreateFormPage from '../pages/create-form-page/create-form-page';
import MainPage from '../pages/main-page/main-page';
import { useAppDispatch } from './routes/lib/hook';
import { useEffect } from 'react';
import { OnlyAuth } from './routes/protected-route';
import { getUserInformation } from '../shared/api/api';
import { loggedIn, loggedOut, setEmail, setName } from '../entities/user/model/userSlice';
import { IUser } from '../entities/user/model/user';

function App() {
  const dispatch = useAppDispatch();

  useEffect(()=> {
		if (localStorage.getItem('token')) {
			getUserInformation()
            .then(({email, name}: IUser)=>{
                dispatch(loggedIn());
                dispatch(setEmail(email));
                dispatch(setName(name ?? ''));
            })
            .catch((err) => {
                dispatch(loggedOut());
                localStorage.removeItem('token');
                console.error(err);
            });
        }
    }, []);

  return (
      <div className="flex flex-col w-screen">
        <Header />
         <Routes>
          <Route path={RoutePathname.homePage} element={<MainPage />} />
          <Route path={RoutePathname.loginPage} element={<LoginPage />} />
          <Route path={RoutePathname.registerPage} element={<RegisterPage />} />
          <Route path={RoutePathname.createForm} element={<OnlyAuth component={<CreateFormPage />} />} />
         </Routes>
      </div>
  )
}

export default App
