# Santos Tree Service

Informational website with Astro, Tailwind CSS, TypeScript, and Supabase.

## Tech Stack

- **Astro** — Static/site generation
- **Tailwind CSS** — Styling
- **TypeScript** — Type safety
- **Supabase** — Auth, Postgres, Storage

## Project Structure

```
src/
  components/       # Astro/UI components
  layouts/          # Page layouts
  lib/supabase/     # Supabase client & data access
  pages/            # Routes (public + /admin)
  styles/           # Global CSS
```

## Setup

```bash
pnpm install
pnpm dev
```

## Environment Variables

```env
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
```

## Scripts

| Command        | Description                     |
| -------------- | ------------------------------- |
| `pnpm dev`     | Start dev server (0.0.0.0:4321) |
| `pnpm build`   | Production build                |
| `pnpm preview` | Preview production build        |

## Docker

```bash
docker compose up --build
```

Dev container exposes port 4321.
