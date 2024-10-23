import { Button, Switch, Tooltip } from "@nextui-org/react";
import { useTheme } from "next-themes";
import moonIcon from "../../assets/icons8-moon-30-2.png";
import sunIcon from "../../assets/icons8-sun.svg";
import { useEffect, useState } from "react";
import { RoutePathname } from "../../app/routes/constants";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/routes/lib/hook";
import { logout } from "../../shared/api/user";
import { resetUser } from "../../entities/user/model/userSlice";
import SearchTemplates from "../../features/search-templates/ui/search-templates";
import { RootState } from "../../app/appStore";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);

  const handleLogout = () => {
      logout();
      dispatch(resetUser());
      navigate(RoutePathname.loginPage);
    };
  

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLightTheme = theme === 'light';

  return (
    <header className="justify-center flex-col gap-5 flex lg:justify-between lg:flex-row w-11/12 mr-auto ml-auto pt-10 items-center flex-wrap sm:justify-center sm:flex-col sm:gap-5 max-w-screen-xl">
      <div className="flex cursor-pointer" onClick={() => navigate(RoutePathname.homePage)}>
        <p className="text-base font-medium text-xl uppercase text-purple-700 font-mono">
          Form
        </p>
        <p className="text-base font-medium text-xl uppercase text-green-500 font-mono">
          Lab
        </p>
      </div>
      <SearchTemplates />
      <div className="flex flex-wrap items-center gap-2">
        {user.isLoggedIn ? (
          <>
            <Button
              color="secondary"
              variant="light"
              className="font-mono"
              size="md"
              onClick={() => navigate(RoutePathname.createTemplate)}
            >
              Create template
            </Button>
            <Button
              isIconOnly
              radius="full"
              color="secondary"
              variant="shadow"
              size="sm"
              className="text-base"
              onClick={() => navigate(RoutePathname.profilePage)}
            >
              {user.name ? user.name[0] : 'U'}
            </Button>
            <Button
              color="secondary"
              variant="light"
              className="font-mono"
              onClick={handleLogout}
            >
              Logout
            </Button> 
          </>
        ) : (
          <>
            <Tooltip color="secondary" content="If you want to create a template you should be authorized">
              <Button
                color="secondary"
                variant="light"
                className="font-mono"
                size="md"
                onClick={() => navigate(RoutePathname.createTemplate)}
              >
                Create template
              </Button>
            </Tooltip>
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