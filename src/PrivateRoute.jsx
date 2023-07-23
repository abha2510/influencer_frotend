import { Navigate, useLocation, Outlet } from "react-router-dom";

function PrivateRoute() {
  const username = localStorage.getItem("username");
  const location = useLocation();
  
  return username ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />;
}

export default PrivateRoute
