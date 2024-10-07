import { Card, CardBody } from "@nextui-org/react";
import RegisterForm from "../../features/register-form/register-form";


const RegisterPage = () => {
    return (
        <main className="flex flex-col items-center w-11/12 mr-auto ml-auto pt-24">
            <Card className="w-1/2 p-10 border-3 border-purple-700 border-dotted">
                <CardBody className="w-full flex flex-col items-center">  
                    <h2 className="font-mono font-bold text-2xl uppercase mb-12">
                        Registration
                    </h2>
                    <RegisterForm />
                </CardBody>
            </Card>
        </main>
    )
}

export default RegisterPage;