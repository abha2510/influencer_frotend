import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ children, ...props }) {
  const username = localStorage.getItem("username");
  const isAuth = Boolean(username); 
  
  return isAuth ? <Route {...props}>{children}</Route> : <Navigate to="/" />;
}

export default PrivateRoute;
