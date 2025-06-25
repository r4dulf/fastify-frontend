import { useLocation } from "react-router-dom";
import { useEventsQuery } from "../../api/query/events";
import { SEARCH_PARAM_KEY } from "../../constants";
import { EventCard } from "../../components/EventCard";

import "./index.scss";

export const Events = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const search = searchParams.get(SEARCH_PARAM_KEY) || undefined;

  const { data, isLoading } = useEventsQuery({ search });

  return (
    <div className="events-page">
      <h1>Events</h1>

      {isLoading ? (
        <p>Loading events...</p>
      ) : data && data.length > 0 ? (
        <div className="events-list">
          {data.map((event) => (
            <EventCard key={event.key} event={event} />
          ))}
        </div>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};
