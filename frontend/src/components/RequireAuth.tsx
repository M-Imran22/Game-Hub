import { Outlet, Navigate, useLocation } from "react-router-dom";
import AuthStore from "../store/AuthStore";

interface Props {
  allowedRoles: string[];
}

const RequireAuth = ({ allowedRoles }: Props) => {
  const { auth } = AuthStore();
  const location = useLocation();

  return auth?.roles?.find((role: string) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
