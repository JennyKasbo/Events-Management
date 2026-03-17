# Events Hub

Modern event management frontend built with React, TypeScript, and Tailwind CSS. It supports role‑aware experiences for admins and users, including event creation, registrations, approvals, and audit logs.

## Highlights
- Role-aware UI for **Admin** and **User** flows
- Feature-based architecture under `src/Features`
- Event discovery with filters, search, and pagination
- Admin approvals with detailed submission view
- Audit logs viewer for admins
- Light/Dark theme + EN/AR localization
- Input validation with suspicious pattern detection and strong password enforcement
- Fully responsive UI for mobile and desktop

## Tech Stack
- React 19 + TypeScript
- Tailwind CSS
- React Router
- Axios

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install
```bash
npm install
```

### Run (Development)
```bash
npm start
```

### Build
```bash
npm run build
```

## Environment
The app uses CRA proxy in `package.json`:
```json
"proxy": "https://events-management-api-production.up.railway.app"
```
If you want a different API base URL, update `proxy` or set `API_BASE_URL` in `src/Api/ApiConfig.ts`.

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

### Key Features

**Events (Users)**
- Browse upcoming events
- View event details
- Register with LinkedIn profile, education level, and motivation

**Events (Admins)**
- Create and delete events
- Review submissions
- Approve registrations (PENDING → APPROVED)

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
- `npm start` – start dev server
- `npm run build` – production build
- `npm test` – run tests

## Notes
- Authentication uses JWT stored in localStorage/sessionStorage.
- Localization and theme are managed in `src/Context/ThemeLocaleContext.tsx`.
- Registration validates inputs for suspicious patterns and requires a strong password.

## License
MIT (adjust if needed)
