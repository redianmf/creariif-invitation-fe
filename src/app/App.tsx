import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../layouts/app-layout";
import { AuthPage } from "../pages/auth/auth.page";
import { CheckoutPage } from "../pages/checkout/checkout.page";
import { DashboardPage } from "../pages/dashboard/dashboard.page";
import { InvitationEditorPage } from "../pages/invitation-editor/invitation-editor.page";
import { LandingPage } from "../pages/landing/landing.page";
import { PublicInvitationPage } from "../pages/public-invitation/public-invitation.page";
import { ProfilePage } from "../pages/profile/profile.page";
import { TemplatesPage } from "../pages/templates/templates.page";
import { selectIsAuthenticated, useAuthStore } from "../shared/auth/auth-store";
import { ProtectedRoute } from "./protected-route";

function AppRoutes() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

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
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/invitations/:id" element={<InvitationEditorPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
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
  return <AppRoutes />;
}
