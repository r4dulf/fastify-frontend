import { useQuery } from "@tanstack/react-query";
import type { paths } from "../../types/api";
import { EVENTS_KEY } from "../keys";
import { fetcher } from "../../lib/fetcher";

type EventsResponse =
  paths["/events"]["get"]["responses"]["200"]["content"]["application/json"];

type EventsSearchParams = paths["/events"]["get"]["parameters"]["query"];

export const useEventsQuery = (params?: EventsSearchParams) => {
  return useQuery<EventsResponse>({
    queryKey: [EVENTS_KEY, params],
    queryFn: () =>
      fetcher<EventsResponse>(
        `/events${
          params?.search ? `?search=${encodeURIComponent(params.search)}` : ""
        }`
      ),
  });
};
