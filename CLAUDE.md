@AGENTS.md

## Project context handoff (read this first)

Before re-reading components or exploring the codebase from scratch, check for these files at the project root:

- `PRODUCT.md` — who the apartment-rental site is for, its purpose, and durable constraints (owner contact info not yet filled in, etc.). Written by the `impeccable` skill's `init` command.
- `DESIGN.md` (+ `.impeccable/design.json`) — the Mediterranean/Crete visual design system (palette, type, components) established for this site. Written by the `impeccable` skill's `document` command.

If either is missing, don't block on it — just note it and carry on; create it only if the user asks or a redesign pass needs it.

**Habit to keep across sessions:** at the end of any session where real design/UI work happened (new components, visual redesign passes, token changes), update `DESIGN.md`/`.impeccable/design.json` (and `PRODUCT.md` if product facts changed) to reflect what shipped, before ending the session. This is how later sessions avoid re-deriving context by re-reading every component.

## Keeping secrets out of the public repo

This project is pushed to a public-looking GitHub repository. Whenever the user hands over real credentials or private data (SMTP password, API keys, the owner's actual phone/WhatsApp number, etc.):

- It goes in `.env.local` (already covered by `.gitignore`'s `.env*` rule) and is read via `process.env.*` — never hardcoded into `src/config/site.ts`, component code, or `messages/*.json`.
- Before writing a value the user just gave into any file, check whether that file is gitignored; if it isn't and the value looks like a credential, stop and ask where it should live instead.
- Before staging/committing, double-check the diff for anything secret-looking, even in files that don't sound sensitive by name.
- Facts the owner has deliberately made public (street address, real photos) are not secrets — this is about credentials and anything explicitly flagged as private, not about the site's own public content.
