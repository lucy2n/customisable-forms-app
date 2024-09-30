import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import moonIcon from "../../assets/icons8-moon-50.png";
import sunIcon from "../../assets/icons8-sun.svg";
import { useEffect, useState } from "react";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLightTheme = theme === 'light';

  return (
    <header className="flex justify-between w-11/12 mr-auto ml-auto pt-10">
      <div className="flex">
        <p className="text-base font-medium text-xl uppercase text-purple-700">
          Form
        </p>
        <p className="text-base font-medium text-xl uppercase text-green-500">
          Lab
        </p>
      </div>
      <Switch
        checked={!isLightTheme}
        size="lg"
        color="success"
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        startContent={<img src={sunIcon} alt="Light Mode" width="24" height="24" />}
        endContent={<img src={moonIcon} alt="Dark Mode" width="24" height="24" />}
        />
    </header>
  );
};

export default Header;