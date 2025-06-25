import { usePopularEventsQuery } from "../../api/query/events";
import { EventsList } from "../../components/EventsList";
import { LoadingSpinner } from "../../components/LoadingSpinner";

import "./index.scss";

export const Home = () => {
  const { data: events, isLoading } = usePopularEventsQuery(10);

  return (
    <div className="home page">
      <div className="greetings-block">
        <h1>Welcome to Eventify!</h1>
        <p>Your one-stop solution for managing and discovering events.</p>
        <p>Explore our features and start planning your next event today!</p>
      </div>

      <div className="content">
        {isLoading ? (
          <div className="center-div">
            <LoadingSpinner />
          </div>
        ) : events?.length ? (
          <>
            <h2>Here's our most popular events:</h2>

            <EventsList events={events} />
          </>
        ) : (
          <p>
            No events found. Please check back later or create your own event!
          </p>
        )}
      </div>
    </div>
  );
};
