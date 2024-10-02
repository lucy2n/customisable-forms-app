import MainPage from '../pages/main-page/main-page';
import LoginPage from '../pages/login-page/login-page';
import Header from '../widgets/header/header';

function App() {
  return (
      <div className="flex flex-col w-screen">
        <Header />
        <MainPage />
        <LoginPage />
      </div>
  )
}

export default App
