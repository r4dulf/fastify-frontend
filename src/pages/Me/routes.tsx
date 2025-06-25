import { Route, Routes } from "react-router-dom";
import { Me } from ".";
import { MyEvents } from "./MyEvents";

export const MeRoutes = () => (
  <Routes>
    <Route path="/" element={<Me />} />
    <Route path="/events" element={<MyEvents />} />
  </Routes>
);
