import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { useAuth } from "../../context/AuthContext/useAuth";

import "./index.scss";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const Me = () => {
  const navigate = useNavigate();
  const { logout, user, isAuthenticated, isLoginPending, isLoading } =
    useAuth();

  if (isLoginPending || isLoading) {
    return (
      <div className="center-div">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    navigate("/", { replace: true });

    return null;
  }

  return (
    <div className="me page">
      <div className="half">
        <h1>Hi {user.name}!</h1>

        <p>
          Welcome to your account page. Here you can manage your profile, view
          your events, and log out.
        </p>

        <Button
          kind="danger"
          onClick={() => {
            navigate("/", { replace: true });
            logout();
          }}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};
