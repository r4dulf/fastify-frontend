import { useCallback, useEffect, type ReactNode } from "react";
import { useMeQuery } from "../../api/query/me";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from ".";
import { useLoginMutation, useRegisterMutation } from "../../api/query/auth";
import useLocalStorageState from "use-local-storage-state";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const [token, setToken] = useLocalStorageState<string | null>("token");

  const { mutateAsync: login, isPending: isLoginPending } = useLoginMutation();
  const { mutateAsync: register } = useRegisterMutation();
  const {
    data: user,
    isLoading,
    isError,
  } = useMeQuery({ enabled: Boolean(token) });

  const logout = useCallback(async () => {
    setToken(null);

    await queryClient.invalidateQueries();
    queryClient.clear();
  }, [queryClient, setToken]);

  const loginCallback = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        const response = await login({ email, password });

        setToken(response.token);
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    [login, setToken]
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

  useEffect(() => {
    if (isError) {
      logout();
      console.error("An error occurred while fetching user data. Logging out.");
    }
  }, [isError, logout]);

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
