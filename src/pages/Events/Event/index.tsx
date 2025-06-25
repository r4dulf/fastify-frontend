import { useNavigate, useParams } from "react-router-dom";
import { useEventQuery, usePutEvent } from "../../../api/query/events";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { Button } from "../../../components/Button";
import { useAuth } from "../../../context/AuthContext/useAuth";
import toast from "react-hot-toast";

import "./index.scss";
import { useState } from "react";
import { EventForm } from "./EventForm";

export const EventPage = () => {
  const navigate = useNavigate();

  const { user, isAdmin, isAuthenticated } = useAuth();
  const params = useParams<{ id: string }>();
  const { data: event, isLoading } = useEventQuery(params.id || "");

  const { mutateAsync: putEvent } = usePutEvent();

  const [isEditMode, setIsEditMode] = useState(false);

  if (isLoading) {
    return (
      <div className="center-div">
        <LoadingSpinner />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event page">
        <h1 className="event-title">Event Not Found</h1>

        <p className="event-description">
          The event you are looking for does not exist.
        </p>

        <Button onClick={() => navigate("/events")}>Back to Events</Button>
      </div>
    );
  }

  const isEditable = (user && user.id === event.createdByUserId) || isAdmin;

  return (
    <div className="event page">
      <div className="half">
        {isEditMode ? (
          <EventForm
            isEditing
            defaultValues={event}
            onCancel={() => setIsEditMode(false)}
            onSubmit={async (data) => {
              try {
                const formattedDate = new Date(data.date).toISOString();

                await putEvent({
                  ...event,
                  ...data,
                  date: formattedDate,
                });

                toast.success("Event updated successfully!");

                setIsEditMode(false);
              } catch {
                toast.error("Failed to update event.");
              }
            }}
          />
        ) : (
          <>
            <div className="event-details">
              <h1>{event.title}</h1>

              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="event-image"
                />
              )}

              <p className="event-date">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>

              <p className="event-location">Location: {event.location}</p>
              <p className="event-description">{event.description}</p>
            </div>

            <div className="event-actions">
              {isEditable && (
                <Button
                  kind="secondary"
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  Edit Event
                </Button>
              )}

              <Button
                kind="primary"
                onClick={() => {
                  if (!isAuthenticated) {
                    toast.error(
                      "You must be logged in to register for an event."
                    );

                    return;
                  }
                }}
              >
                Register for Event
              </Button>

              <Button kind="secondary" onClick={() => navigate("/events")}>
                Back to Events
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
