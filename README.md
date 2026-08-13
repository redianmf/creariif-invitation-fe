# Creariif Invitation Frontend

A Vite, React, and TypeScript application for creating and managing digital wedding invitations.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure the API base URL in `.env`:

   ```env
   VITE_API_URL=http://localhost:8080/api/v1
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check and create a production build. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint once an ESLint flat config is added. |

## Authentication state

Authentication is managed globally with Zustand in [`src/shared/auth/auth-store.ts`](src/shared/auth/auth-store.ts).

- Both email/password login and Google callback responses are typed as `LoginResponse` and saved in the store.
- The complete login response, including `user` and `token`, is persisted in `localStorage` using the `creariif-auth` key.
- Use `selectAuthUser`, `selectAuthToken`, and `selectIsAuthenticated` to read the user, bearer token, or authentication state from React components.
- Calling `logout` clears the persisted response and redirects the user to `/auth` through the user menu.

Protected routes read their access state from the same store, and services use `selectAuthToken` when making authenticated API requests.

## User menu and profile

After a successful login, the header replaces the login control with an avatar button containing the first letter of the user's name or email. Its dropdown displays the signed-in user's name and email and provides:

- **Profile** — opens the protected `/profile` page.
- **Logout** — clears the auth store and returns to `/auth`.

The reusable menu component is located in [`src/components/user-menu.tsx`](src/components/user-menu.tsx).

## Main routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Landing page; authenticated users are redirected to the dashboard. |
| `/auth` | Public | Sign in and registration. |
| `/dashboard` | Protected | Invitation overview. |
| `/templates` | Protected | Template selection. |
| `/checkout` | Protected | Checkout flow. |
| `/invitations/:id` | Protected | Invitation editor. |
| `/profile` | Protected | Signed-in user information. |
| `/p/:invitationSlug` | Public | Public invitation page. |

## API responses

The login endpoints are defined in [`src/shared/api/api.ts`](src/shared/api/api.ts). They support the following response shape after unwrapping the API envelope:

```ts
interface LoginResponse {
  user: {
    user_id: string;
    name: string;
    email: string;
    role: string;
  };
  token: {
    access_token: string;
  };
}
```
