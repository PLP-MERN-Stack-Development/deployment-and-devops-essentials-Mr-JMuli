# SkyPharma — MVP

Minimal MERN app for an online pharmacy + delivery. Backend is deployed to Render and frontend to Vercel.

## Local development

### Server
1. Copy `.env.example` to `server/.env` and fill `MONGODB_URI`.
2. `cd server && npm ci`
3. `npm run dev`

### Client
1. `cd client && npm ci`
2. `REACT_APP_API_URL=http://localhost:4000 npm start`

## Deploy
- Create a Render Web Service for `server` (connect GitHub, set build/start commands, add env vars). Use `web: node src/index.js` command.
- Create a Vercel project for `client` (connect GitHub, set build command `npm run build` and output `build`). Set `REACT_APP_API_URL` in Vercel env.

## CI/CD
- GitHub Actions defined in `.github/workflows/ci-cd.yml` runs build and triggers Render & Vercel deploys (requires secrets: `RENDER_API_KEY`, `RENDER_SERVICE_ID`, `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`).

## Notes & next steps
- Add authentication, payments (Stripe), delivery driver tracking, admin UI.
- Harden product stock updates (use transactions) and add tests.
