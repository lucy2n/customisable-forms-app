import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import eye from '../../assets/icons8-eye-24.png'
import { useNavigate } from "react-router-dom";
import { RoutePathname } from "../../app/routes/constants";

const RegisterForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate(RoutePathname.loginPage)
    }

    return (
        <form className="flex flex-col items-center gap-5 w-full" onSubmit={handleSubmit}>
            <Input
                type="text"
                label="Username"
                placeholder="Enter your username"
                variant="bordered"
                className="w-2/3"
            />
            <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                className="w-2/3"
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
            />
            <Button size="lg" color="secondary" type="submit" className="w-1/4 font-mono">
                Submit
            </Button>
        </form>
    )
}

export default RegisterForm;