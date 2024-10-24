import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from './lib/hook';
import { RoutePathname } from './constants';
import { RootState } from '../appStore';

const Protected = ({ onlyUnAuth = false, component }: { onlyUnAuth?: boolean, component: JSX.Element}): JSX.Element | null => {
  const user = useAppSelector((store: RootState) => store.user);
  const location = useLocation();

  if (onlyUnAuth && user.isLoggedIn) {
    const { from } = location.state as { from: Location } || { from: { pathname: RoutePathname.homePage } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user.isLoggedIn) {
    return <Navigate to={RoutePathname.loginPage} state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: {component: JSX.Element}) => (
    <Protected onlyUnAuth={true} component={component} />
);