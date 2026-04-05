# Assign Guard

A full-stack web application with:

- `frontend/`: Next.js app
- `backend/`: Node.js + TypeScript API

## Project Structure

- `backend/` - API server, routes, controllers, and database models
- `frontend/` - Web UI built with Next.js

## Prerequisites

- Node.js (18+ recommended)
- pnpm

## Getting Started

### 1. Install dependencies

```bash
cd backend && pnpm install
cd ../frontend && pnpm install
```

### 2. Run backend

```bash
cd backend
pnpm dev
```

### 3. Run frontend

```bash
cd frontend
pnpm dev
```

Then open the frontend URL shown in the terminal (usually `http://localhost:3000`).

## Notes

- Backend environment variables should be configured in the backend setup (for example via `.env`).
- Run frontend and backend in separate terminals.
