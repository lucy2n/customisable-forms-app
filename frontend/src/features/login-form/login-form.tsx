import { FC, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import eye from '../../assets/icons8-eye-24.png'

interface LoginFormProps {
    handleLogin : (email: string, password: string) => void
}

const LoginForm: FC<LoginFormProps> = ({handleLogin}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
    
        try {
            handleLogin(email, password);
        } catch (err) {
          console.error('Ошибка регистрации:', err.message);
        }
      };

    return (
        <form className="flex flex-col items-center gap-5 w-full" onSubmit={handleSubmit}>
            <Input
                type="email"
                label="Email"
                variant="bordered"
                className="w-2/3"
                onChange={(e) => setEmail(e.target.value)}
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
            />
            <Button size="lg" color="secondary" type="submit" className="w-1/4 font-mono">
                Submit
            </Button>
        </form>
    )
}

export default LoginForm;