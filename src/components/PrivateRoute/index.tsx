import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/useAuth";
import { LoginModalContext } from "../../context/LoginModalContext";
import { LoadingSpinner } from "../LoadingSpinner";

type Props = {
  children: ReactNode;
};

export const PrivateRoute = ({ children }: Props) => {
  const { openModal } = useContext(LoginModalContext);
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="center-div">
        <LoadingSpinner />;
      </div>
    );

  if (!isAuthenticated) {
    // If the user is not authenticated, open the login modal
    openModal();

    return <Navigate to="/" replace />;
  }

  return children;
};
