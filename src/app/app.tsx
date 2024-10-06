import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login-page/login-page';
import Header from '../widgets/header/header';
import { RoutePathname } from './routes/constants';
import RegisterPage from '../pages/register-page/register-page';
import CreateFormPage from '../pages/create-form-page/create-form-page';
import FormTemplate from '../features/form-template/form-template';
import MainPage from '../pages/main-page/main-page';

function App() {
  return (
      <div className="flex flex-col w-screen">
        <Header />
         <Routes>
          <Route path={RoutePathname.homePage} element={<MainPage />} />
          <Route path={RoutePathname.loginPage} element={<LoginPage />} />
          <Route path={RoutePathname.registerPage} element={<RegisterPage />} />
          <Route path={RoutePathname.createForm} element={<CreateFormPage />} />
         </Routes>
      </div>
  )
}

export default App
