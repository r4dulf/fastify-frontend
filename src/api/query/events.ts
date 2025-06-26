import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { EVENTS_KEY, POPULAR_EVENTS_KEY, PUT_KEY } from "../keys";
import { fetcher } from "../../lib/fetcher";
import type { paths } from "../../types/api";

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

const putEvent = async (event: Partial<Event> & Pick<Event, "key">) => {
  return fetcher(`/events/${event.key}`, {
    method: "PUT",
    body: JSON.stringify(event),
  }) as Promise<Event>;
};

type UsePutEventMutationOptions = UseMutationOptions<
  Event,
  Error,
  Partial<Event> & Pick<Event, "key">,
  { previousEvents?: Event[] }
>;

const configurePutEventMutation = (
  queryClient: ReturnType<typeof useQueryClient>,
  options?: Partial<UsePutEventMutationOptions>
): UsePutEventMutationOptions => {
  return {
    onMutate: async (event) => {
      await queryClient.cancelQueries({ queryKey: [EVENTS_KEY] });

      const previousEvents = queryClient.getQueryData<Event[]>([EVENTS_KEY]);

      queryClient.setQueryData<Event[]>([EVENTS_KEY], (old) =>
        old?.map((e) => (e.key === event.key ? { ...e, ...event } : e))
      );

      return { previousEvents };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData<Event[]>([EVENTS_KEY], context?.previousEvents);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [EVENTS_KEY] });
    },
    ...options,
  };
};

export const usePutEvent = (options?: UsePutEventMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [PUT_KEY, EVENTS_KEY],
    ...configurePutEventMutation(queryClient, options),
    mutationFn: (vars) => putEvent(vars),
  });
};

const postEvent = async (event: Partial<Event>) => {
  return fetcher(`/events`, {
    method: "POST",
    body: JSON.stringify(event),
  }) as Promise<Event>;
};

export const usePostEvent = (
  options?: UseMutationOptions<Event, Error, Partial<Event>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [PUT_KEY, EVENTS_KEY],

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [EVENTS_KEY] });
    },
    ...options,
    mutationFn: (vars) => postEvent(vars),
  });
};

const deleteEvent = async (key: string) => {
  await fetcher(`/events/${key}`, {
    method: "DELETE",
    body: JSON.stringify({ key }),
  });
};

type UseDeleteEventMutationOptions = UseMutationOptions<
  void,
  Error,
  string,
  { previousEvents: Event[] }
>;

export const useDeleteEvent = (
  options?: Partial<UseDeleteEventMutationOptions>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [PUT_KEY, EVENTS_KEY],
    mutationFn: deleteEvent,

    onMutate: (key) => {
      queryClient.cancelQueries({ queryKey: [EVENTS_KEY] });

      const previousEvents = queryClient.getQueryData<Event[]>([EVENTS_KEY]);

      queryClient.setQueryData<Event[]>([EVENTS_KEY], (old) =>
        old?.filter((e) => e.key !== key)
      );

      return { previousEvents: previousEvents ?? [] };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData<Event[]>([EVENTS_KEY], context?.previousEvents);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [EVENTS_KEY] });
    },

    ...options,
  });
};

const registerToEvent = async ({
  eventKey,
  registrationKey,
}: {
  eventKey: string;
  registrationKey?: string;
}) => {
  const res = await fetcher<Promise<{ data: { success: boolean } }>>(
    `/events/${eventKey}/register`,
    {
      method: "POST",
      body: JSON.stringify({ key: registrationKey }),
    }
  );

  return res.data;
};

export const useRegisterToEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerToEvent,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EVENTS_KEY] });
    },
  });
};
