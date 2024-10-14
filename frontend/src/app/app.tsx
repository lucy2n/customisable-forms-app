import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login-page/login-page';
import Header from '../widgets/header/header';
import { RoutePathname } from './routes/constants';
import RegisterPage from '../pages/register-page/register-page';
import CreateFormPage from '../pages/create-form-page/create-form-page';
import MainPage from '../pages/main-page/main-page';
import { useAppDispatch } from './routes/lib/hook';
import { useEffect, useState } from 'react';
import { OnlyAuth } from './routes/protected-route';
import { getUserInformation } from '../shared/api/user';
import { loggedIn, loggedOut, setEmail, setId, setName } from '../entities/user/model/userSlice';
import { IUser } from '../entities/user/model/user';

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true); // Флаг загрузки данных пользователя

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      getUserInformation()
        .then(({id, email, name }: IUser) => {
          dispatch(loggedIn());
          dispatch(setId(id + ''))
          dispatch(setEmail(email));
          dispatch(setName(name ?? ''));
        })
        .catch((err) => {
          console.error('Ошибка при загрузке данных пользователя:', err);
          dispatch(loggedOut());
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false); // Завершить загрузку
        });
    } else {
      setLoading(false); // Завершить загрузку, если токена нет
    }
  }, [dispatch]);

  // Если данные пользователя еще загружаются, можно показывать индикатор загрузки
  if (loading) {
    return <div>Загрузка...</div>;
  }

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
  );
}

export default App;