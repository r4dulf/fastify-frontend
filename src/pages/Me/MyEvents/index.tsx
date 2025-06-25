import { useNavigate } from "react-router-dom";
import { useMeEvents } from "../../../api/query/me";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import toast from "react-hot-toast";
import { EventsList } from "../../../components/EventsList";

import "./index.scss";

export const MyEvents = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useMeEvents();

  if (isLoading) {
    return (
      <div className="center-div">
        <LoadingSpinner />
      </div>
    );
  }

  if (!data) {
    toast.error("Failed to load events. Please try again later.");

    navigate("/");

    return null;
  }

  return (
    <div className="my-events page">
      <h1>My Events</h1>

      <p>
        Here you can find all the events you have created or registered for.
      </p>

      <div className="columns">
        <div className="created">
          <h2>Created Events</h2>

          {data.created.length > 0 ? (
            <EventsList events={data.created} />
          ) : (
            <p className="text-gray-500">You haven't created any events yet.</p>
          )}
        </div>

        <div className="registered">
          <h2>Registered Events</h2>

          {data.registered.length > 0 ? (
            <EventsList events={data.registered} />
          ) : (
            <p>You haven't registered for any events yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
