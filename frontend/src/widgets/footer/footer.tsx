import { Button } from "@nextui-org/react";
import { RoutePathname } from "../../app/routes/constants";
import { useNavigate } from "react-router-dom";
import HelpModal from "../../features/help-modal/help-modal";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="justify-center flex-col gap-5 flex lg:justify-between lg:flex-row w-11/12 mr-auto ml-auto pt-20 items-center flex-wrap sm:justify-center sm:flex-col sm:gap-5 max-w-screen-xl">
      <div className="flex cursor-pointer" onClick={() => navigate(RoutePathname.homePage)}>
        <p className="text-base font-medium text-sm uppercase text-purple-700 font-mono">
            Lucy Naumenko - 2024
        </p>
      </div>
      <div className="flex gap-5">
        <HelpModal />
        <Button
            color="secondary"
            variant="light"
            className="font-mono"
            size="md"
        >
            GitHub
        </Button>
      </div>
    </footer>
  );
};

export default Footer;