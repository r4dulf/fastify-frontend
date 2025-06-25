import { useCallback, type ReactNode } from "react";
import { useMeQuery } from "../../api/query/me";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from ".";
import { useLoginMutation, useRegisterMutation } from "../../api/query/auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: login, isPending: isLoginPending } = useLoginMutation();
  const { mutateAsync: register } = useRegisterMutation();
  const { data: user, isLoading } = useMeQuery();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    queryClient.clear();
  }, [queryClient]);

  const loginCallback = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        const response = await login({ email, password });

        localStorage.setItem("token", response.token);
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    [login]
  );

  const registerCallback = useCallback(
    async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      try {
        const response = await register({ name, email, password });

        localStorage.setItem("token", response.token);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },
    [register]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isLoading,
        isLoginPending,
        isAuthenticated: !!user,

        register: registerCallback,
        login: loginCallback,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
