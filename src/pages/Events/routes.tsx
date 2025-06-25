import { Route, Routes } from "react-router-dom";
import { Events } from ".";
import { EventPage } from "./Event";

export const EventRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Events />} />
      <Route path="/:id" element={<EventPage />} />
    </Routes>
  );
};
