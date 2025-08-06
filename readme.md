# ETS2 Mod Launcher API

This is the backend service for the ETS2 Mod Launcher.

## Setup

1. Copy `.env.example` to `.env` and fill in your values.
2. `npm install`
3. `npm run dev`

## Available Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Mods
- GET /api/mods
- GET /api/mods/:id
- POST /api/mods      (admin)
- PUT /api/mods/:id   (admin)
- DELETE /api/mods/:id (admin)
- GET /api/mods/:id/download

### Licenses
- POST   /api/license/activate
- GET    /api/license/status
