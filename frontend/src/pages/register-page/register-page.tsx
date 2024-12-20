import { Card, CardBody } from "@nextui-org/react";
import RegisterForm from "../../features/register-form/register-form";
import { createUser } from "../../shared/api/user";
import { IUser } from "../../entities/user/model/user";
import { useNavigate } from "react-router-dom";
import { RoutePathname } from "../../app/routes/constants";
import { useState } from "react";


const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

    const handleRegister = async (name: string, email: string, password: string) => {
        const newUser: IUser = {
          name: name,
          email: email,
          password: password,
          status: 'active'
        };
        await createUser(newUser)
        .then((res) => {
          setError('')
          console.log(res)
          navigate(RoutePathname.loginPage)
        })
        .catch(err => setError(err.message))
      };

    return (
        <main className="flex flex-col items-center w-11/12 mr-auto ml-auto pt-24 max-w-screen-xl">
            <Card className="sm:w-2/3 md:w-1/2 lg:w-1/2 lg:p-10 md:p-10 sm:p-0 border-1 border-purple-700 border-dotted">
                <CardBody className="w-full flex flex-col items-center">  
                    <h2 className="font-mono font-bold text-2xl uppercase mb-12">
                        Registration
                    </h2>
                    <RegisterForm handleRegister={handleRegister} error={error}/>
                </CardBody>
            </Card>
        </main>
    )
}

export default RegisterPage;