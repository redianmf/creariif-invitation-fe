import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { InvitationEditorPage } from "./pages/InvitationEditorPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { PublicInvitationPage } from "./pages/PublicInvitationPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./lib/auth";
import { LandingPage } from "./pages/LandingPage";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LandingPage />
          )
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/invitations/:id" element={<InvitationEditorPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Route>
      <Route path="/p/:invitationSlug" element={<PublicInvitationPage />} />
      <Route
        path="/p/:invitationSlug/:guestSlug"
        element={<PublicInvitationPage />}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
