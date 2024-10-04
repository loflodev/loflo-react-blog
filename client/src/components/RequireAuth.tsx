import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";

const RequireAuth = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  console.log(auth);

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
