import LoginForm from "../../features/login-form/login-form";
import { Card, CardBody } from "@nextui-org/react";


const LoginPage = () => {
    return (
        <main className="flex flex-col items-center w-11/12 mr-auto ml-auto pt-24">
            <Card shadow="lg" className="w-1/2 p-10 border-1 border-purple-700 border-dotted">
                <CardBody className="w-full flex flex-col items-center">  
                    <h2 className="font-mono font-bold text-2xl uppercase mb-3">
                        Login
                    </h2>
                    <p className="mb-5 font-mono w-full text-center">
                        <span className="text-green-500">Sign in</span> to create your own form
                    </p>
                    <LoginForm />
                </CardBody>
            </Card>
        </main>
    )
}

export default LoginPage;