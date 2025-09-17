# Karat Challenge

A pnpm workspace with a React frontend and Elysia backend.

## Questions

### How else might you have improved your solution given more time?

The pagination logic could use a bit more work. It's fine, and does what it's supposed to, but it'd be nice to track the pages a bit better. Kinda an issue with Stripe's API too.

### How might you have gone about further optimizing the load time of this view?

Caching. Frontend caches the transactions and data between page changes, but having a backend cache for transactions and reporting pieces would be a good move. Otherwise, there's not a ton to optimize.
The analytics/reporting cache would probably look to see what's the latest transaction, is it the same as the latest checked in the analytics?

- If yes: Send cached data.
- If no: There's a new transaction, recalculate.

### Feedback and Calibration

**Approximately how many hours did you spend on this challenge?**
About 4 hours total, probably would be 2-3 if I wan't watching TV while doing it.
**What did you find most interesting / rewarding about this challenge?**
I like that it's part of - What did you find least interesting / rewarding about this challenge?

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
pnpm dev         # Start dev server with hot reload
pnpm build       # Build for production
pnpm start       # Start production server
```
