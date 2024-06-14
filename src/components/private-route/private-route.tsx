import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactElement } from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';
import { RootState } from '../../store/root-reducer';

interface PrivateRouteProps {
  element: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.authorizationStatus);

  return isAuthenticated === AuthorizationStatus.Auth ? element : <Navigate to={AppRoute.Root} />;
};

export default PrivateRoute;
