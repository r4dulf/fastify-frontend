import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppWrapper } from "./components/AppWrapper";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<AppWrapper>Home Page</AppWrapper>} />
      </Routes>
    </BrowserRouter>
  );
};
