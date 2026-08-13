export interface AuthUser {
  user_id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthToken {
  access_token: string;
  [key: string]: unknown;
}

export interface LoginResponse {
  user: AuthUser;
  token: AuthToken;
}
