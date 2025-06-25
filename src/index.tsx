import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppWrapper } from "./components/AppWrapper";
import { Home } from "./pages/Home";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfUse } from "./pages/TermsOfUse";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext/provider";
import { LoginModalProvider } from "./context/LoginModalContext/provider";
import { PrivateRoute } from "./components/PrivateRoute";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <LoginModalProvider>
        <AuthProvider>
          <AppWrapper>
            <Routes>
              <Route index element={<Home />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-of-use" element={<TermsOfUse />} />

              <Route
                path="me"
                element={
                  <PrivateRoute>
                    <div>My Profile</div>
                  </PrivateRoute>
                }
              />
            </Routes>
          </AppWrapper>
        </AuthProvider>
      </LoginModalProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
