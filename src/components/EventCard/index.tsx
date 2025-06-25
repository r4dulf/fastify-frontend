import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import type { Event } from "../../api/query/events";

import "./index.scss";

export const EventCard = ({ event }: { event: Event }) => {
  const navigate = useNavigate();

  return (
    <div className="event-card">
      <div className="content">
        <h3 className="event-title">{event.title}</h3>

        {event.imageUrl && (
          <img src={event.imageUrl} alt={event.title} className="event-image" />
        )}

        <p className="event-date">
          {new Date(event.date).toLocaleDateString()}
        </p>

        <p className="event-location">Location: {event.location}</p>
        <p className="event-description">{event.description}</p>
      </div>

      <Button kind="secondary" onClick={() => navigate(`/events/${event.key}`)}>
        View Details
      </Button>
    </div>
  );
};
