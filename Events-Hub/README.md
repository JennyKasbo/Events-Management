# Events Hub

Modern event management frontend built with React, TypeScript, and Tailwind CSS. It supports role-aware experiences for admins and users, including event creation, registrations, approvals, and audit logs.

## Highlights
- Role-aware UI for Admin and User flows
- Feature-based architecture under `src/Features`
- Event discovery with filters, search, and pagination
- Admin approvals with detailed submission view
- Audit logs viewer for admins
- Light/Dark theme plus EN/AR localization
- Input validation with suspicious pattern detection and strong password enforcement
- Fully responsive UI for mobile and desktop

## Tech Stack
- React 19 + TypeScript
- Tailwind CSS
- React Router
- Axios

## Setup Instructions

### Prerequisites
- Node.js 18+ (tested with Node 18)
- npm 9+

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env` file at the project root (next to `package.json`) and define the API base URL:
```bash
REACT_APP_API_URL=https://events-management-api-production.up.railway.app
```

## API Configuration
The application reads the API base URL from the environment variable `REACT_APP_API_URL`. This must be set to the provided backend base URL. For example:
```bash
REACT_APP_API_URL=https://events-management-api-production.up.railway.app
```

Note: CRA also supports a `proxy` entry in `package.json`, but this project is configured to prefer the explicit environment variable so the API target is clear and reviewable.

## Application Startup
Run the development server:
```bash
npm start
```
The app will be available at `http://localhost:3000`.

## Build & Deployment

### Production Build
```bash
npm run build
```
The production bundle is generated in the `build/` directory.

### Deployment
This project is ready for Netlify deployment using the included `netlify.toml` and `.env.production`.

**Netlify Steps**
1. Push the project to a Git repository (GitHub/GitLab/Bitbucket).
2. Create a new site in Netlify and connect the repo.
3. Netlify will read `netlify.toml` automatically:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Deploy the site.

**How API requests work in production**
- The frontend calls `/api/*` (from `.env.production`).
- Netlify redirects `/api/*` to the backend using `netlify.toml`.

If a deployment exists, document it here (for example: `https://your-deployment.example.com`).

## Project Structure
```
src/
  Api/
  Assets/
  Components/
  Context/
  Features/
    Events/
    Logs/
  Layout/
  Pages/
```

## Key Features

**Events (Users)**
- Browse upcoming events
- View event details
- Register with LinkedIn profile, education level, and motivation

**Events (Admins)**
- Create and delete events
- Review submissions
- Approve registrations (PENDING -> APPROVED)

**Logs (Admins)**
- View audit logs from `/audit-logs`

## API Endpoints (Current Integration)

**Events**
- `GET /events?page=1&limit=10&search=...`
- `POST /events`
- `DELETE /events/:id`
- `GET /events/:id`
- `GET /events/upcoming?page=1&limit=20&search=&type=&dateFrom=&dateTo=`
- `GET /events/attended`

**Registrations**
- `POST /registrations/:eventId`
- `GET /registrations/event/:eventId?page=1&limit=10`
- `PATCH /registrations/:id/approve`

**Logs**
- `GET /audit-logs`

## Scripts
- `npm start` - start dev server
- `npm run build` - production build
- `npm test` - run tests

## Assumptions, Limitations and Trade-offs
- Assumption: The backend API base URL is stable and exposed through `REACT_APP_API_URL` across environments.
- Limitation: No authentication refresh or token rotation is documented or implemented in this frontend.
- Limitation: Error handling is UI-focused; API retries and offline support are not implemented.
- Trade-off: Features were prioritized over broader test coverage; only minimal tests are present (if any).
- Improvement: Add automated tests for critical flows (events creation, registration approval, audit logs).
- Improvement: Add CI steps for linting, type-checking, and production build validation.
- Improvement: Add a deployment section with the real URL and environment-specific configuration notes.

## Notes
- Authentication uses JWT stored in localStorage/sessionStorage.
- Localization and theme are managed in `src/Context/ThemeLocaleContext.tsx`.
- Registration validates inputs for suspicious patterns and requires a strong password.

## License
MIT
