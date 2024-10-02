import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/main-page/main-page';
import LoginPage from '../pages/login-page/login-page';
import Header from '../widgets/header/header';
import { RoutePathname } from './routes/constants';
import RegisterPage from '../pages/register-page/register-page';

function App() {
  return (
      <div className="flex flex-col w-screen">
        <Header />
         <Routes>
          <Route path={RoutePathname.homePage} element={<MainPage />} />
          <Route path={RoutePathname.loginPage} element={<LoginPage />} />
          <Route path={RoutePathname.registerPage} element={<RegisterPage />} />
         </Routes>
      </div>
  )
}

export default App
