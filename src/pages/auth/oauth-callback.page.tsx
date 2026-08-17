import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { api } from "../../shared/api/api";
import { selectIsAuthenticated, useAuthStore } from "../../shared/auth/auth-store";

export function OAuthCallbackPage() {
  const isProcessed = useRef(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const setLoginResponse = useAuthStore((state) => state.setLoginResponse);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  useEffect(() => {
    async function processOAuthResponse() {
      // Prevent double-execution caused by React.StrictMode re-renders,
      // since the auth code is single-use and becomes invalid on retry.
      if (isProcessed.current) return;
      isProcessed.current = true;

      if (isAuthenticated) {
        navigate("/dashboard", { replace: true });
        return;
      }

      const googleCode = params.get("code");
      if (!googleCode) {
        toast.error("No authorization code found.");
        navigate("/auth", { replace: true });
        return;
      }

      try {
        const response = await api.auth.googleCallback(googleCode);
        setLoginResponse(response);
        toast.success("Signed in with Google!");
        navigate("/dashboard", { replace: true });
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Google sign-in failed.",
        );
        navigate("/auth", { replace: true });
      }
    }

    processOAuthResponse();
  }, []);

  return (
    <div className="oauth-callback-container">
      <div className="oauth-callback-spinner" />
      <p className="oauth-callback-text">Signing you in…</p>
    </div>
  );
}
