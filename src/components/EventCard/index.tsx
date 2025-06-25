import { useNavigate } from "react-router-dom";
import type { paths } from "../../types/api";
import { Button } from "../Button";

export type Event =
  paths["/events"]["get"]["responses"]["200"]["content"]["application/json"][number];

export const EventCard = ({ event }: { event: Event }) => {
  const navigate = useNavigate();

  return (
    <div className="event-card">
      <h3 className="event-title">{event.title}</h3>

      {event.imageUrl && (
        <img src={event.imageUrl} alt={event.title} className="event-image" />
      )}

      <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
      <p className="event-location">{event.location}</p>
      <p className="event-description">{event.description}</p>

      <Button kind="secondary" onClick={() => navigate(`/events/${event.key}`)}>
        View Details
      </Button>
    </div>
  );
};
