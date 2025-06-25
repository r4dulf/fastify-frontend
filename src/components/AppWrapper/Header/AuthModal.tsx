import { Input } from "../../Input";
import { Modal } from "../../Modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../context/AuthContext/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Button";
import { useState } from "react";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const AuthModal = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const { isLoginPending, login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

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

      onClose();
      navigate("/");

      toast.success("Logged in successfully!");
    } catch (err: unknown) {
      if (!(err instanceof Error)) {
        toast.error("An unexpected error occurred.");
        console.error("Unexpected error:", err);

        return;
      }

      toast.error("An error occurred while logging in.");
    }
  };

  return (
    <Modal onClose={onClose} headerText="Authentication">
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
  );
};
