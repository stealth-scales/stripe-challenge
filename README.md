# Karat Challenge

A pnpm workspace with a React frontend and Elysia backend.

## Structure

```
karat-challenge/
├── apps/
│   ├── frontend/          # React + TypeScript + Vite
│   └── backend/           # Elysia backend
├── packages/              # Shared packages (empty for now)
└── pnpm-workspace.yaml    # Workspace configuration
```

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Bun (for running the Elysia backend)

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start development servers:

   ```bash
   pnpm dev
   ```

   This will start:

   - Frontend at http://localhost:3000
   - Backend at http://localhost:3001

## Available Scripts

- `pnpm dev` - Start all development servers
- `pnpm build` - Build all apps
- `pnpm lint` - Lint all apps
- `pnpm type-check` - Type check all apps

## Individual App Commands

### Frontend (React + Vite)

```bash
cd apps/frontend
pnpm dev        # Start dev server
pnpm build      # Build for production
pnpm preview    # Preview production build
```

### Backend (Elysia)

```bash
cd apps/backend
bun dev         # Start dev server with hot reload
bun build       # Build for production
bun start       # Start production server
```

## API Endpoints

- `GET /` - Hello message
- `GET /health` - Health check
- `GET /api/hello?name=<name>` - Greeting with optional name parameter
