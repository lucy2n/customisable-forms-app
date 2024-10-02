import LoginPage from '../pages/login-page/login-page'
import RegisterPage from '../pages/register-page/register-page'
import Header from '../widgets/header/header'

function App() {
  return (
      <div className="flex flex-col w-screen">
        <Header />
        <LoginPage />
      </div>
  )
}

export default App
