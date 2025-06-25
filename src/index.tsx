import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppWrapper } from "./components/AppWrapper";
import { Home } from "./pages/Home";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfUse } from "./pages/TermsOfUse";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext/provider";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <AppWrapper>
          <Routes>
            <Route index element={<Home />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-use" element={<TermsOfUse />} />
          </Routes>
        </AppWrapper>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
