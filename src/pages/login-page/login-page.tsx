import LoginForm from "../../features/login-form/login-form";
import { Card, CardBody } from "@nextui-org/react";


const LoginPage = () => {
    return (
        <main className="flex flex-col items-center w-11/12 mr-auto ml-auto pt-24">
            <Card className="w-2/3 p-10 shadow-md shadow-green-500 md:shadow-xl md:shadow-green-500 border-t-1 border-purple-700">
                <CardBody className="w-full flex flex-col items-center">  
                    <h2 className="font-mono text-base font-bold text-3xl uppercase mb-3">
                        Sign In
                    </h2>
                    <p className="mb-5 font-mono w-full text-center">
                        Sign in to create your own form
                    </p>
                    <LoginForm />
                </CardBody>
            </Card>
        </main>
    )
}

export default LoginPage;