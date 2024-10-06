import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Authenticated = () => {
  const { auth, isLoading } = useAuth();
  const location = useLocation();
  console.log(auth);

  if (isLoading) {
    return null;
  }

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default Authenticated;
