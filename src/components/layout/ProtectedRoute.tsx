import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { currentToken } from "../../redux/features/auth/authSlice";
import useCurrentUserInfo from "@/hoooks/useCurrentUserInfo";

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: string[];
}) => {
  const token = useAppSelector(currentToken);
  const { role } = useCurrentUserInfo();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!allowedRoles.includes(role as string)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
