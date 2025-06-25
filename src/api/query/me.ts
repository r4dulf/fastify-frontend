import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { ME_KEY } from "../keys";
import type { paths } from "../../types/api";
import { fetcher } from "../../lib/fetcher";

type MeResponse =
  paths["/me"]["get"]["responses"]["200"]["content"]["application/json"];

type MeQueryOptions = UseQueryOptions<MeResponse, Error>;

export const useMeQuery = (options?: Partial<MeQueryOptions>) =>
  useQuery<MeResponse>({
    queryKey: [ME_KEY],
    queryFn: () => fetcher<MeResponse>("/me"),
    meta: { auth: true, label: ME_KEY },
    ...options,
  });
