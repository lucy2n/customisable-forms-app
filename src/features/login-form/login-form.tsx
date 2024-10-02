import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import eye from '../../assets/icons8-eye-24.png'

const LoginForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <form className="flex flex-col items-center gap-5 w-full">
            <Input
                type="email"
                label="Email"
                variant="bordered"
                className="w-full"
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
                className="w-full"
            />
            <Button size="lg" color="secondary" type="submit" className="w-1/4 font-mono">
                Submit
            </Button>
        </form>
    )
}

export default LoginForm;