import { AppContext } from '@/context/AppContext';
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

  return <><NavBar/><div className='flex flex-row min-h-svh justify-center'>{children}</div></>;
};

export default PrivateRoute;
