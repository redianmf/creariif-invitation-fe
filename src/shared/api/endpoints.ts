export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    GOOGLE_LOGIN: "/auth/google/login",
    GOOGLE_CALLBACK: (code: string) => `/auth/google/callback?code=${encodeURIComponent(code)}`,
  },
  TEMPLATES: {
    LIST: "/templates",
    GET: (id: string) => `/templates/${id}`,
  },
  INVITATIONS: {
    LIST: "/invitations",
    GET: (id: string) => `/invitations/${id}`,
    UPDATE: (id: string) => `/invitations/${id}`,
    PUBLISH: (id: string) => `/invitations/${id}/publish`,
    ADD_GUEST: (id: string) => `/invitations/${id}/guests`,
  },
  ORDERS: {
    CHECKOUT: "/orders/checkout",
    LIST: "/orders",
  },
  PUBLIC: {
    GET_INVITATION: (invitationSlug: string, guestSlug?: string) =>
      `/p/${invitationSlug}${guestSlug ? `/${guestSlug}` : ""}`,
    SUBMIT_RSVP: (invitationSlug: string, guestSlug: string) =>
      `/p/${invitationSlug}/${guestSlug}/rsvp`,
    SUBMIT_MESSAGE: (invitationSlug: string) =>
      `/p/${invitationSlug}/message`,
  },
};
