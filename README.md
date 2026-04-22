# Office Management System

A full-stack Office Management System built with React, Express, and MongoDB.

## What Changed

The project now supports role-based authentication:

- All users can log in (admins and employees with account credentials).
- Only users with the `admin` role can create, update, or delete data.
- Non-admin users can log in and view employees and departments in read-only mode.

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT

## Local Setup

## 1. Backend

1. Go to server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create env file:
   ```bash
   cp .env.example .env
   ```
4. Fill values in `.env`:
   - `PORT`
   - `DB_URL`
   - `JWT_SECRET`
   - `CLIENT_URLS` (comma-separated list of frontend URLs)

5. Run backend:
   ```bash
   npm run dev
   ```

## 2. Frontend

1. Go to client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` with:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Run frontend:
   ```bash
   npm run dev
   ```

## API Security Rules

- Authenticated routes:
  - `GET /api/employees`
  - `GET /api/employees/:id`
  - `GET /api/departments`
- Admin-only routes:
  - `POST /api/employees`
  - `PUT /api/employees/:id`
  - `DELETE /api/employees/:id`
  - `POST /api/departments`
  - `PUT /api/departments/:id`
  - `DELETE /api/departments/:id`

## API Documentation

- Postman collection file: `Office_Management_System.postman_collection.json`
- Import the collection in Postman and set variables:
  - `baseUrl` (default: `http://localhost:5000/api`)
  - `token` (JWT from login response)
  - `departmentId`
  - `employeeId`

## Deployment

## Frontend on Vercel

The file `client/vercel.json` is included to support SPA routing.

1. Import the repository in Vercel.
2. Set project root to `client`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add env var:
   - `VITE_API_URL=https://<your-render-service>.onrender.com/api`

## Backend on Render

The file `render.yaml` is included for Render Blueprint deployment.

1. Create a new Blueprint service in Render from this repository.
2. Render will use `render.yaml` with root directory `server`.
3. Set secret env vars in Render:
   - `DB_URL`
   - `JWT_SECRET`
   - `CLIENT_URLS` (include your Vercel domain, for example `https://your-app.vercel.app`)
4. Health endpoint is available at:
   - `/api/health`

## Notes

- Employee accounts now require a password.
- Admins can assign user role (`admin` or `user`) from the employee form.
- Existing employee records without passwords must be updated by an admin before those users can log in.
