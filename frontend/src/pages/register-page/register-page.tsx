import { Card, CardBody } from "@nextui-org/react";
import RegisterForm from "../../features/register-form/register-form";
import { createUser } from "../../shared/api/user";
import { IUser } from "../../entities/user/model/user";
import { useNavigate } from "react-router-dom";
import { RoutePathname } from "../../app/routes/constants";


const RegisterPage = () => {
  const navigate = useNavigate();

    const handleRegister = async (name: string, email: string, password: string) => {
        const newUser: IUser = {
          name: name,
          email: email,
          password: password,
        };
      
        try {
          console.log(newUser, 'user')
          const registeredUser = await createUser(newUser);
          console.log('Пользователь зарегистрирован:', registeredUser);
        } catch (err) {
          console.error('Ошибка регистрации:', err.message);
        }
        navigate(RoutePathname.loginPage)
      };

    return (
        <main className="flex flex-col items-center w-11/12 mr-auto ml-auto pt-24">
            <Card className="w-1/2 p-10 border-3 border-purple-700 border-dotted">
                <CardBody className="w-full flex flex-col items-center">  
                    <h2 className="font-mono font-bold text-2xl uppercase mb-12">
                        Registration
                    </h2>
                    <RegisterForm handleRegister={handleRegister}/>
                </CardBody>
            </Card>
        </main>
    )
}

export default RegisterPage;