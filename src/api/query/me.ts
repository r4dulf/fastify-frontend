import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { ME_EVENTS_KEY, ME_KEY } from "../keys";
import type { paths } from "../../types/api";
import { fetcher } from "../../lib/fetcher";

export type User =
  paths["/me"]["get"]["responses"]["200"]["content"]["application/json"];

type MyEvents =
  paths["/me/events"]["get"]["responses"]["200"]["content"]["application/json"];

type MeQueryOptions = UseQueryOptions<User, Error>;

export const useMeQuery = (options?: Partial<MeQueryOptions>) =>
  useQuery<User>({
    queryKey: [ME_KEY],
    queryFn: () => fetcher<User>("/me"),
    meta: { auth: true, label: ME_KEY },
    ...options,
  });

export const useMeEvents = () =>
  useQuery<MyEvents>({
    queryKey: [ME_EVENTS_KEY],
    queryFn: () => fetcher("/me/events"),
  });
