import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { useAuth } from "../../context/AuthContext/useAuth";

export const Me = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="me-page">
      <h1>My Profile</h1>
      <p>This is the user profile page.</p>

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
  );
};
