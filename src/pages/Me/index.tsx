import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { useAuth } from "../../context/AuthContext/useAuth";
import { LoadingSpinner } from "../../components/LoadingSpinner";

import "./index.scss";
import { useState } from "react";
import { EventForm } from "../Events/Event/EventForm";
import { usePostEvent } from "../../api/query/events";
import toast from "react-hot-toast";

export const Me = () => {
  const navigate = useNavigate();
  const { logout, user, isAuthenticated, isLoginPending, isLoading } =
    useAuth();

  const { mutateAsync: postEvent } = usePostEvent();

  const [isCreateEvent, setIsCreateEvent] = useState(false);

  if (isLoginPending || isLoading) {
    return (
      <div className="center-div">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    navigate("/", { replace: true });

    return null;
  }

  return (
    <div className="me page">
      <div className="half">
        {isCreateEvent ? (
          <EventForm
            isEditing={false}
            onCancel={() => setIsCreateEvent(false)}
            onSubmit={async (data) => {
              const formattedDate = new Date(data.date).toISOString();

              await postEvent({
                ...data,
                createdByUserId: user.id,
                date: formattedDate,
              });

              toast.success("Event created successfully!");

              setIsCreateEvent(false);
            }}
          />
        ) : (
          <div className="me-content">
            <h1>Hi {user.name}!</h1>

            <p>
              Welcome to your account page. Here you can manage your profile,
              view your events, and log out.
            </p>

            <div className="user-info">
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>

            <div className="actions">
              <Button kind="primary" onClick={() => setIsCreateEvent(true)}>
                Create Event
              </Button>

              <Button
                kind="primary"
                onClick={() => navigate("/me/events", { replace: true })}
              >
                My Events
              </Button>

              <Button
                kind="danger"
                onClick={() => {
                  navigate("/", { replace: true });
                  logout();
                }}
              >
                Log Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
