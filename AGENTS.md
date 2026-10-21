# AGENTS.md

Guidance for coding agents and AI code reviewers working on this repo.

The project has two deployables:

1. **Site**: an Astro v5 static site with React islands, hosted on Netlify at `girg.is`.
2. **`sierra-api`**: a Cloudflare Worker (Hono) in `api/` that powers the Sierra chatbot, the AI greeting and Cal.com booking. Netlify proxies `/api/*` to it.

## Commands

### Site (repo root)

- `npm run dev`: Astro dev server on **port 8080**
- `npm run build`: static build to `dist/`
- `npm run preview`: preview the production build
- `npm run lint`: ESLint (`eslint.config.js`). Generated files under `.netlify/` currently produce noise (see #18).
- `npm run knowledge:reindex`: rebuilds Sierra's RAG index from `api/knowledge/manifest.json`. It's a dry run unless you pass `--apply`. `--local` targets local D1, and `--skip-embed` skips Cohere embedding. Requires `COHERE_API_KEY`.
- `npm run test` has no root test suite and exits with an error by design.

### Worker (`cd api`)

- `npm run dev`: `wrangler dev` on **port 8788**
- `npm run test`: Vitest unit tests (`*.test.ts` next to the source)
- `npm run typecheck`: `tsc --noEmit`
- `npm run test:smoke` / `npm run test:redteam`: hit a running API (`API_BASE_URL`, default `http://localhost:8788/api`)
- `npm run deploy`: `wrangler deploy` (production; don't run it unless asked)
- D1 migrations live in `api/migrations/`. Apply them with `wrangler d1 migrations apply sierra-db`.

## Site architecture

- Pages live in `src/pages/*.astro`. Files prefixed with `_` are ignored by Astro; they're old v2 React pages.
  - `/`: `index.astro` (hero, about, featured projects, workspace)
  - `/projects`: `ProjectsPage`
  - `/workspace`: `WorkspaceSectionNew`
  - `/writing`, `/resources`: `[section].astro`, built only when `PUBLIC_FEATURE_WRITING` / `PUBLIC_FEATURE_RESOURCES` is exactly `"true"` (`src/config/featureFlags.ts`)
  - `404.astro`: standalone page, doesn't use `BaseLayout`
- `src/layouts/BaseLayout.astro` holds the head metadata and GA tags, the theme bootstrap script, and mounts the Sierra chatbot (`client:load`) on every page.
- React islands hydrate with `client:load` or `client:visible`. The footer (`FooterNew.astro`, `AsciiSkyline.astro`) is Astro-only and ships no JS.
- Path alias `@/` maps to `src/` (`astro.config.mjs`, `tsconfig.json`).
- Theme: dark is the default; light/dark is a class on `<html>`, persisted in `localStorage.theme`. Colour tokens are HSL CSS variables in `src/styles/global.css`; Tailwind reads them (`tailwind.config.ts`).
- Fonts: Geist Mono (primary), Geist, and Geist Pixel are self-hosted in `public/fonts/`.

### Key components

- `HeroSectionNew`: Saturn ASCII animation (`AsciiArtPlayer` + `src/data/load-frames.ts`) next to `TypingAnimation`. Fires a `hero-typing-complete` window event when typing finishes.
- `TypingAnimation`: types the hero lines, then appends the AI greeting fetched from `/api/greeting`.
- `StarField`: canvas star background; respects `prefers-reduced-motion`.
- `NavigationNew`, `AboutSectionNew`, `FeaturedProjects` (projects with `featured: true`), `WorkspaceSectionNew` (hotspots from `src/data/deskHotspots.ts`).
- `src/components/ui/sierrachatbot.tsx`: the Sierra chat UI. It streams SSE from `/api/chat` and drives the booking flow through `/api/booking/*`. Booking state types are in `src/lib/sierra-booking.ts`. The welcome bubble waits for `hero-typing-complete` (with a 15 s fallback).

### Data

- `src/data/projects.ts`: project list. The weekly `update-projects` workflow opens PRs against it, and Sierra's RAG index reads it.
- `src/data/deskHotspots.ts`, `src/data/ascii-art.ts`, `src/data/types.ts`
- `src/data/writeups.ts`: empty scaffold for the Writing section

### Legacy files

Much of `src/` is left over from the v1/v2 sites and is not reachable from any page: `App.tsx`, `main.tsx`, `HeroSection.tsx`, `Navigation.tsx`, `Footer.tsx`, `FooterNew.tsx`, `AboutSection.tsx`, most of `src/components/ui/`, plus root files like `scripts.js`, `timeline.js`, `vite.config.ts`. See #19. Don't build new work on them; check that a file is imported by a live page before editing it.

## Worker architecture (`api/`)

- Entry point `api/src/index.ts` sets up a Hono app with CORS (`ALLOWED_ORIGINS`) and body-size limits.
  - `GET /api/greeting` (`greeting.ts`): short AI greeting for Toronto time and Canadian holidays, cached in KV (`GREETING_CACHE`).
  - `GET /api/health` (`health.ts`)
  - `POST /api/chat` (`chat.ts`): RAG plus OpenAI streaming over SSE. History is stored in D1. A classifier decides whether the booking tool is offered (`chat-tools.ts`). Traces go to Langfuse (`langfuse.ts`).
  - `POST /api/booking/drafts`, `.../:draftId/slot`, `.../:draftId/confirm`, `DELETE .../:draftId` (`booking.ts`, `cal.ts`): a draft-based booking flow against the Cal.com API.
- Bindings (`api/wrangler.toml`): D1 `DB` and `RAG_DB` (both `sierra-db`), Vectorize `VECTORIZE` (`sierra-knowledge`, Cohere `embed-v4.0`, 1024-d), KV `GREETING_CACHE`, rate limiters for chat, booking search and booking confirm.
- `RAG_BACKEND = "cloudflare"` is the live path (Cohere + Vectorize + D1). The Supabase path in `chat.ts`/`supabase.ts` is a fallback.
- Abuse controls: per-IP rate limiters, a per-day AI budget (`usage-limits.ts`, table `ai_usage_daily`), and per-session message limits in `chat.ts`.
- The system prompt is in `api/src/system-prompt.ts`. User input, history, page metadata and retrieved content are passed to the model as **untrusted data**. Keep it that way.
- The knowledge corpus is `api/knowledge/sources/**` plus `src/data/projects.ts`, configured in `api/knowledge/manifest.json`.

## Deployment

- **Netlify** builds the site with `npm run build` and publishes `dist/` (`netlify.toml`). `netlify.toml` proxies `/api/greeting`, `/api/health`, `/api/chat` and `/api/booking/*` to `https://sierra-api.andrew-girgis.workers.dev`. Host and short-link redirects are in `public/_redirects`.
- The **Worker** is deployed manually with `cd api && npm run deploy`. Secrets are set with `wrangler secret put`, never in `wrangler.toml`.
- **GitHub Actions**:
  - `release-please.yml` runs on pushes to `main`
  - `update-projects.yml` runs every Monday and opens a PR on `auto/update-projects`
- **Code review** is done by Codex (`chatgpt-codex-connector`); comment `@codex review` on a PR to request one. There is no comment-triggered agent workflow.

## Environment variables and secrets

- Site (build time, public): `PUBLIC_FEATURE_WRITING`, `PUBLIC_FEATURE_RESOURCES`. See `.env.example`.
- Worker secrets: `OPENAI_API_KEY`, `COHERE_API_KEY`, `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY`, `LANGFUSE_BASE_URL`, `CAL_API_KEY` (or `CAL_COM_API_KEY`), plus optional `SUPABASE_*` for the fallback. Non-secret vars are under `[vars]` in `api/wrangler.toml`.
- Actions secrets: `OPENAI_API_KEY`, used by `update-projects.yml` (`GITHUB_TOKEN` is automatic).
- Never expose a secret to the client. Only `PUBLIC_*` variables may be read in `src/`.

## Conventions

- **Loose TypeScript on the site** (`noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false`). ESLint's `@typescript-eslint/no-unused-vars` is off. This is intentional; don't "fix" it by tightening the config.
- Prefer Astro components for anything that doesn't need client-side JS. Use `client:visible` rather than `client:load` for below-the-fold islands.
- Match the terminal/CLI aesthetic: section headings are shell commands (`$ ls ./projects`), and the font is monospace.
- Canadian context: Toronto time zone, Canadian holidays and Canadian spelling in user-facing copy.
- Commit messages and PR titles should follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`) so Release Please can version releases. Don't bump `package.json` `version` by hand.
- `.gitignore` ignores `*.md` except `README.md`, `AGENTS.md`, `CLAUDE.md`, `SECURITY.md` and `api/knowledge/**/*.md`. A new Markdown file needs an explicit `!` rule to be tracked.

## Writing style for PRs and comments

Write all PR titles, PR descriptions and comments in ASD-STE100 Simplified Technical English (STE). This rule applies to review comments, replies to review comments and issue comments. It also applies to automated reviewers such as Codex.

- Write short sentences. Use a maximum of 20 words in an instruction and 25 words in a description.
- Write one instruction in each sentence. Use the imperative form, for example "Apply the migration."
- Use the active voice.
- Use one word for one meaning. Use the same term for the same thing each time.
- Write a maximum of six sentences in each paragraph.
- Write file paths, function names, commands and other code names exactly as they are in the code.
- Keep the Conventional Commits prefix (`feat:`, `fix:`) at the start of PR titles.

## Code review guidelines

When reviewing a PR, prioritise in this order:

1. **Security and abuse.** Secrets must stay server-side. Any endpoint that calls a paid API (OpenAI, Cohere) or acts on a third party's behalf (Cal.com bookings, emails, invites) needs rate limiting and abuse protection, and should count against the daily budget *after* cheap validation. Validate request bodies, use parameterised D1 queries, and keep CORS limited to known origins. Workflows triggered by comments or PRs must not expose secrets to untrusted users; pin third-party actions.
2. **Prompt-injection boundaries in Sierra.** Anything from the user, the page or retrieval must be passed as untrusted data, never put into the system prompt. Tool calls (booking) must stay gated on the intent classifier and server-side validation.
3. **Correctness.** Booking drafts must keep their status transitions and idempotency. SSE streams must always end with `done` or `error`. Time zone handling should use `Intl` with an explicit zone.
4. **Performance.** Watch HTML size (don't inline large ASCII/SVG blobs), use Astro image optimisation for photos, hydrate islands as late as possible, and avoid new heavy client dependencies.
5. **Accessibility and SEO.** One `<h1>` per page, alt text, keyboard-reachable controls, `prefers-reduced-motion` for animations, and correct head metadata in `BaseLayout.astro`.
6. **Hygiene.** No new code in legacy files, no committed build output (`dist/`, `.astro/`, `.netlify/`, `.wrangler/`) or `.DS_Store`, and no large media in git.

Don't flag the intentional loose TypeScript settings or unused variables.

Write review comments in STE. See "Writing style for PRs and comments".
