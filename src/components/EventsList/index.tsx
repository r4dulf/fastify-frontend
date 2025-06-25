import { EventCard } from "../EventCard";
import type { Event } from "../../api/query/events";

import "./index.scss";

export const EventsList = ({ events }: { events: Event[] }) => {
  return (
    <div className="events-list">
      {events.map((event) => (
        <EventCard key={event.key} event={event} />
      ))}
    </div>
  );
};
