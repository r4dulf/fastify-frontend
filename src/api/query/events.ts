import { useQuery } from "@tanstack/react-query";
import type { paths } from "../../types/api";
import { EVENTS_KEY } from "../keys";
import { fetcher } from "../../lib/fetcher";

export type Event =
  paths["/events"]["get"]["responses"]["200"]["content"]["application/json"][number];
type EventsSearchParams = paths["/events"]["get"]["parameters"]["query"];

export const useEventsQuery = (params?: EventsSearchParams) => {
  return useQuery<Event[]>({
    queryKey: [EVENTS_KEY, params],
    queryFn: () =>
      fetcher<Event[]>(
        `/events${
          params?.search ? `?search=${encodeURIComponent(params.search)}` : ""
        }`
      ),
  });
};

export const useEventQuery = (key: string) => {
  return useQuery<Event>({
    queryKey: [EVENTS_KEY, key],
    queryFn: () => fetcher(`/events/${key}`),
  });
};
