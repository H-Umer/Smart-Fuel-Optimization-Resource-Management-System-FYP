# Smart Fuel Optimization & Resource Management System

This repository contains a web application for tracking vehicles, fuel purchases, trips, budgets, and crisis-mode fuel optimization.

## Structure

- `backend/` - Node.js + Express API server with MongoDB and JWT authentication
- `frontend/` - Next.js + Tailwind UI client

## Getting Started

### Backend

1. Open a terminal in `backend/`
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Copy `.env.example` to `.env` and update values if needed.
4. Start the API server:
   ```powershell
   npm run dev
   ```

The backend will listen at `http://localhost:5000` by default.

### Frontend

1. Open a terminal in `frontend/`
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Copy `.env.example` to `.env.local` if you want to customize the API URL.
4. Start the Next.js app:
   ```powershell
   npm run dev
   ```

The frontend will run at `http://localhost:3000`.

## Features Included

- User registration, login, and profile updates
- Vehicle CRUD management with efficiency and capacity fields
- Fuel purchase tracking with date, quantity, cost, and notes
- Trip planning with estimated fuel consumption and route recommendations
- Monthly budget creation and overspend alerts
- Dashboard with fuel totals, budget status, and crisis-mode guidance

## Notes

- This scaffolding uses a placeholder route estimation algorithm for demonstration.
- You can extend the frontend with map integrations like Mapbox, Leaflet, or Google Maps.
- Add more analytics charts and interactive dashboards using chart libraries.
