import { useCallback, useEffect, type ReactNode } from "react";
import { useMeQuery } from "../../api/query/me";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from ".";
import { useLoginMutation, useRegisterMutation } from "../../api/query/auth";
import useLocalStorageState from "use-local-storage-state";
import toast from "react-hot-toast";

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

    queryClient.clear();

    toast.success("You have been logged out successfully.");
  }, [queryClient, setToken]);

  const loginCallback = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const response = await login({ email, password });

      setToken(response.token);

      queryClient.invalidateQueries();
    },
    [login, queryClient, setToken]
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
      const response = await register({ name, email, password });

      setToken(response.token);
    },
    [register, setToken]
  );

  useEffect(() => {
    if (isError) {
      logout();

      toast.error(
        "An error occurred while fetching user data. Please log in again."
      );
    }
  }, [isError, logout]);

  return (
    <AuthContext.Provider
      value={{
        user: token ? user : undefined,
        isLoading: isLoading,
        isLoginPending,
        isAuthenticated: Boolean(token && user),
        isAdmin: user?.role === "admin",

        register: registerCallback,
        login: loginCallback,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
