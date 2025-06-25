import { QueryClient, type MutationOptions } from "@tanstack/react-query";
import { fetcher } from "../../lib/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { paths } from "../../types/api";

type LoginBody =
  paths["/auth/login"]["post"]["requestBody"]["content"]["application/json"];

type LoginResponse =
  paths["/auth/login"]["post"]["responses"]["200"]["content"]["application/json"];

type RegisterBody =
  paths["/auth/register"]["post"]["requestBody"]["content"]["application/json"];

type RegisterResponse =
  paths["/auth/register"]["post"]["responses"]["200"]["content"]["application/json"];

export const configureLoginMutation = (): MutationOptions<
  LoginResponse,
  Error,
  LoginBody
> => ({
  mutationFn: (data) =>
    fetcher<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
});

export const useLoginMutation = () => {
  return useMutation(configureLoginMutation());
};

export const configureRegisterMutation = (
  queryClient: QueryClient
): MutationOptions<RegisterResponse, Error, RegisterBody> => ({
  mutationFn: (data) =>
    fetcher<RegisterResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  onSuccess: (data) => {
    localStorage.setItem("token", data.token);
    queryClient.invalidateQueries();
  },
});

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(configureRegisterMutation(queryClient));
};
