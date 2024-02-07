import { AppContext } from '@/context/AppContext';
import { Navbar } from '@nextui-org/react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import NavBar from './NavBar';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isLoggedIn } = useContext(AppContext)
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <><NavBar/>{children}</>;
};

export default PrivateRoute;
