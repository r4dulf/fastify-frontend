import { useLocation } from "react-router-dom";
import { useEventsQuery } from "../../api/query/events";
import { SEARCH_PARAM_KEY } from "../../constants";
import { EventsList } from "../../components/EventsList";

import "./index.scss";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const Events = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const search = searchParams.get(SEARCH_PARAM_KEY) || undefined;

  const { data, isLoading } = useEventsQuery({ search });

  return (
    <div className="events-page">
      <h1>Events</h1>

      {isLoading ? (
        <div className="center-div">
          <LoadingSpinner />
        </div>
      ) : data && data.length > 0 ? (
        <EventsList events={data} />
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};
