import { FC, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import eye from '../../assets/icons8-eye-24.png'

interface RegisterFormProps {
    handleRegister : (name: string, email: string, password: string) => void
}

const RegisterForm: FC<RegisterFormProps> = ({handleRegister}) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
    
        try {
          handleRegister(name, email, password);
        } catch (err) {
          console.error('Ошибка регистрации:', err.message);
        }
      };

    return (
        <form className="flex flex-col items-center gap-5 w-full" onSubmit={handleSubmit}>
            <Input
                type="text"
                label="Username"
                placeholder="Enter your username"
                variant="bordered"
                className="w-2/3"
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                className="w-2/3"
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                        <img src={eye} alt="visible" className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <img src={eye} alt="not visible" className="text-2xl text-default-400 pointer-events-none" />
                    )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                className="w-2/3"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button size="lg" color="secondary" type="submit" className="w-1/4 font-mono">
                Submit
            </Button>
        </form>
    )
}

export default RegisterForm;