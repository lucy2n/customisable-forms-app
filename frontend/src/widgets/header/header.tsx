import { Button, Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import moonIcon from "../../assets/icons8-moon-30-2.png";
import sunIcon from "../../assets/icons8-sun.svg";
import { useEffect, useState } from "react";
import { RoutePathname } from "../../app/routes/constants";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/routes/lib/hook";
import {  } from "../../entities/user/model/userSlice";
// import { logout } from "../../shared/api/user";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user); // Получаем статус входа

  // const handleLogout = () => {
  //   logout(); // Удаление токена на стороне сервера (или локально)
  //   dispatch(resetUser()); // Сброс состояния пользователя
  //   navigate(RoutePathname.loginPage); // Перенаправление на страницу входа
  // };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLightTheme = theme === 'light';

  return (
    <header className="flex justify-between w-11/12 mr-auto ml-auto pt-10 items-center flex-wrap">
      <div className="flex cursor-pointer" onClick={() => navigate(RoutePathname.homePage)}>
        <p className="text-base font-medium text-xl uppercase text-purple-700 font-mono">
          Form
        </p>
        <p className="text-base font-medium text-xl uppercase text-green-500 font-mono">
          Lab
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          color="secondary"
          variant="light"
          className="font-mono"
          size="md"
          onClick={() => navigate(RoutePathname.createTemplate)}
        >
          Create template
        </Button>

        {user.isLoggedIn ? (
          <>
            {/* <Button
              color="secondary"
              variant="light"
              className="font-mono"
              size="md"
              onClick={handleLogout}
            >
              Logout
            </Button> */}
            <Button
             radius="full"
             color="secondary"
             variant="shadow"
             size="sm"
             className="text-base"
            >
              {user.name[0]}
            </Button>
          </>
          
        ) : (
          <>
            <Button
              color="secondary"
              variant="light"
              className="font-mono"
              size="md"
              onClick={() => navigate(RoutePathname.loginPage)}
            >
              Login
            </Button>
            <Button
              color="secondary"
              className="font-mono mr-10"
              size="md"
              onClick={() => navigate(RoutePathname.registerPage)}
            >
              Sign Up
            </Button>
            <Button
              color="secondary"
              variant="light"
              className="font-mono"
              size="md"
              onClick={() => navigate(RoutePathname.adminPage)}
            >
              Admin
            </Button>
          </>
        )}

        <Switch
          checked={!isLightTheme}
          size="md"
          color="success"
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          startContent={<img src={sunIcon} alt="Light Mode" width="24" height="24" />}
          endContent={<img src={moonIcon} alt="Dark Mode" width="24" height="24" />}
        />
      </div>
    </header>
  );
};

export default Header;
