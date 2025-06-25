import { useQuery } from "@tanstack/react-query";
import type { paths } from "../../types/api";
import { EVENTS_KEY, POPULAR_EVENTS_KEY } from "../keys";
import { fetcher } from "../../lib/fetcher";

export type Event =
  paths["/events"]["get"]["responses"]["200"]["content"]["application/json"][number];

type EventsSearchParams = paths["/events"]["get"]["parameters"]["query"];

export type PopularEvent = {
  key: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  createdByUserId: number;
  registrationsCount: number;
};

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

export const usePopularEventsQuery = (limit: number = 5) =>
  useQuery<PopularEvent[]>({
    queryKey: [EVENTS_KEY, POPULAR_EVENTS_KEY, limit],
    queryFn: () => fetcher(`/events/popular?limit=${limit}`),
  });
