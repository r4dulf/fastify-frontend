import { useContext, useState } from "react";
import { Input } from "../../Input";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Button";
import { useAuth } from "../../../context/AuthContext/useAuth";
import { AuthModal } from "./AuthModal";

import "./index.scss";
import { LoginModalContext } from "../../../context/LoginModalContext";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, closeModal, openModal } = useContext(LoginModalContext);

  return (
    <header className="header">
      <div className="left-part">
        <div className="logo">Eventify</div>

        <nav className="nav">
          {[
            { name: "Home", path: "/" },
            { name: "Events", path: "/events" },
            { name: "About Us", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <Button
              key={item.name}
              kind="tertiary"
              size="medium"
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </Button>
          ))}
        </nav>
      </div>

      <div className="right-part">
        <div className="search">
          <Input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="account">
          <Button
            kind="tertiary"
            onClick={() => (isAuthenticated ? navigate("/me") : openModal())}
          >
            {isAuthenticated ? "Account" : "Log In / Sign Up"}
          </Button>
        </div>
      </div>

      {isOpen && <AuthModal onClose={closeModal} />}
    </header>
  );
};
