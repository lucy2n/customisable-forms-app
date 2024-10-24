import LoginForm from "../../features/login-form/login-form";
import { Card, CardBody } from "@nextui-org/react";
import { loginUser } from "../../shared/api/user";
import { useAppDispatch } from "../../app/routes/lib/hook";
import { loggedIn, resetUser, setEmail } from "../../entities/user/model/userSlice";
import { useNavigate } from "react-router-dom";
import { RoutePathname } from "../../app/routes/constants";
import { useState } from "react";


const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<string>('')


    const handleLogin = async (email: string, password: string) => {
        loginUser(email, password)
            .then((res) => {
                setError('')
                localStorage.setItem('token', res.token);
                dispatch(loggedIn());
                dispatch(setEmail(email));
                navigate(RoutePathname.homePage);
            })
            .catch((err) => {
                setError(err.message)
                localStorage.removeItem('token');
                dispatch(resetUser());
            });
    };
      
    return (
        <main className="flex flex-col items-center w-11/12 sm:w-full mr-auto ml-auto pt-24 max-w-screen-xl">
            <Card shadow="lg" className="sm:w-2/3 md:w-1/2 lg:w-1/2 lg:p-10 md:p-10 sm:p-0 border-1 border-purple-700 border-dotted">
                <CardBody className="w-full flex flex-col items-center">  
                    <h2 className="font-mono font-bold text-2xl uppercase mb-3">
                        Login
                    </h2>
                    <p className="mb-5 font-mono w-full text-center">
                        <span className="text-green-500">Sign in</span> to create your own form
                    </p>
                    <LoginForm handleLogin={handleLogin} error={error}/>
                </CardBody>
            </Card>
        </main>
    )
}

export default LoginPage;