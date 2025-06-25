import { useState } from "react";
import { Input } from "../../Input";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Button";

import "./index.scss";
import { Modal } from "../../Modal";
import { useAuth } from "../../../context/AuthContext/useAuth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Header = () => {
  const navigate = useNavigate();

  const { isAuthenticated, isLoginPending, login } = useAuth();

  const [isLogin, setIsLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      setIsAuthModalOpen(false);

      navigate("/");
    } catch (err: unknown) {
      if (!(err instanceof Error)) {
        console.error("Unexpected error:", err);
        return;
      }

      console.error("Login error:", err.message);
    }
  };

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
          <Button kind="tertiary" onClick={() => setIsAuthModalOpen(true)}>
            {isAuthenticated ? "Account" : "Log In / Sign Up"}
          </Button>
        </div>
      </div>

      {isAuthModalOpen && (
        <Modal
          onClose={() => setIsAuthModalOpen(false)}
          headerText="Authentication"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <label>
              Email:
              <Input type="email" {...register("email")} />
            </label>

            {errors.email && <div>{errors.email.message}</div>}

            <label>
              Password:
              <Input type="password" {...register("password")} />
            </label>

            {errors.password && <div>{errors.password.message}</div>}

            <Button
              kind="primary"
              type="submit"
              disabled={isSubmitting || isLoginPending}
            >
              {isLoginPending ? "Loading..." : "Sign In"}
            </Button>

            <Button
              kind="secondary"
              onClick={() => setIsLogin((prev) => !prev)}
              disabled={isLoginPending}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </Button>
          </form>
        </Modal>
      )}
    </header>
  );
};
