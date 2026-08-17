import type { LoginResponse } from "../auth/auth.types";
import { API_ENDPOINTS } from "./endpoints";

const API_BASE_URL =
  (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env
    ?.VITE_API_URL || "http://localhost:8080/api/v1";

interface ApiResponse<T> {
  code: number;
  message: string;
  data?: T;
}

function unwrapResponse<T>(payload: unknown): T {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in (payload as Record<string, unknown>) &&
    (payload as Record<string, unknown>).data !== undefined
  ) {
    return (payload as { data?: T }).data as T;
  }

  return payload as T;
}

interface ErrorEnvelope {
  error: {
    code: number;
    message: string | string[];
  };
}

function getAuthHeaders(token?: string | null) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function request<T>(
  path: string,
  init: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...getAuthHeaders(token),
      ...(init.headers || {}),
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const errorPayload = payload as ErrorEnvelope | undefined;
    throw new Error(
      typeof errorPayload?.error?.message === "string"
        ? errorPayload.error.message
        : "Request failed",
    );
  }

  if (typeof payload === "string") {
    return payload as T;
  }

  return unwrapResponse<T>(payload as ApiResponse<T> | T);
}

export const api = {
  auth: {
    login: (payload: { email: string; password: string }) =>
      request<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    register: (payload: { name: string; email: string; password: string }) =>
      request<any>(API_ENDPOINTS.AUTH.REGISTER, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    googleLogin: () =>
      request<{ url: string }>(API_ENDPOINTS.AUTH.GOOGLE_LOGIN, {
        method: "GET",
      }),
    googleCallback: (code: string) =>
      request<LoginResponse>(
        API_ENDPOINTS.AUTH.GOOGLE_CALLBACK(code),
        {
          method: "POST",
        },
      ),
  },
  templates: {
    list: (token?: string | null) =>
      request<any[]>(API_ENDPOINTS.TEMPLATES.LIST, { method: "GET" }, token),
    get: (id: string, token?: string | null) =>
      request<any>(API_ENDPOINTS.TEMPLATES.GET(id), { method: "GET" }, token),
  },
  invitations: {
    list: (token?: string | null) =>
      request<any[]>(API_ENDPOINTS.INVITATIONS.LIST, { method: "GET" }, token),
    get: (id: string, token?: string | null) =>
      request<any>(API_ENDPOINTS.INVITATIONS.GET(id), { method: "GET" }, token),
    update: (
      id: string,
      payload: { groom_name: string; bride_name: string; story: string },
      token?: string | null,
    ) =>
      request<any>(
        API_ENDPOINTS.INVITATIONS.UPDATE(id),
        { method: "PUT", body: JSON.stringify(payload) },
        token,
      ),
    publish: (id: string, token?: string | null) =>
      request<any>(API_ENDPOINTS.INVITATIONS.PUBLISH(id), { method: "POST" }, token),
    addGuest: (id: string, payload: { name: string }, token?: string | null) =>
      request<any>(
        API_ENDPOINTS.INVITATIONS.ADD_GUEST(id),
        { method: "POST", body: JSON.stringify(payload) },
        token,
      ),
  },
  orders: {
    checkout: (payload: { template_id: string }, token?: string | null) =>
      request<any>(
        API_ENDPOINTS.ORDERS.CHECKOUT,
        { method: "POST", body: JSON.stringify(payload) },
        token,
      ),
    list: (token?: string | null) =>
      request<any[]>(API_ENDPOINTS.ORDERS.LIST, { method: "GET" }, token),
  },
  public: {
    getInvitation: (invitationSlug: string, guestSlug?: string) =>
      request<any>(API_ENDPOINTS.PUBLIC.GET_INVITATION(invitationSlug, guestSlug), {
        method: "GET",
      }),
    submitRsvp: (
      invitationSlug: string,
      guestSlug: string,
      status: "accepted" | "declined",
    ) =>
      request<any>(API_ENDPOINTS.PUBLIC.SUBMIT_RSVP(invitationSlug, guestSlug), {
        method: "POST",
        body: JSON.stringify({ status }),
      }),
    submitMessage: (
      invitationSlug: string,
      payload: { name: string; message: string },
    ) =>
      request<any>(API_ENDPOINTS.PUBLIC.SUBMIT_MESSAGE(invitationSlug), {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  },
};
