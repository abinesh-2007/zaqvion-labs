# ZAQVION LABS

Production-ready Next.js customer platform foundation. It is intentionally enquiry-first: no public prices are rendered.

## Run locally

1. Copy `.env.example` to `.env.local`. The supplied email and WhatsApp values are safe public settings; add only the browser-safe Supabase URL and anon key when available.
2. Run `npm.cmd install`.
3. Run `npm.cmd run dev`.

The UI works locally without external services for catalogue search, filtering, recommendations, comparison, favourites and browser-saved enquiry receipts. Valid enquiry forms immediately open a prefilled WhatsApp message; customers manually choose whether to send it. Supabase auth, database persistence, review moderation, admin operations and project tracking require server-side integration before production use.

## Deploy to Vercel

1. Push this repository to your Git provider and import it in Vercel. No `vercel.json` is required for this standard Next.js app.
2. In **Project Settings → Environment Variables**, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` only if Supabase is being enabled. Do not add service-role keys to Vercel client-facing variables.
3. Build command: `npm run build`; install command: `npm install`. Vercel detects these automatically.
4. Add the deployed URL and relevant local URL to Supabase Auth's redirect URL allow-list before enabling login or password reset.
5. Apply `supabase/migrations/202610300001_initial.sql` through the Supabase CLI or SQL editor, then review and extend administrator policies before activating admin tooling.

The migration is version-controlled but has not been applied by this repository. Current public contact links work without Supabase; reviews, accounts, dashboard, admin actions and private progress records must remain in their explicit setup states until the Supabase client, server validation, and role checks are implemented.

## Release checks

Run `npm.cmd run lint` and `npm.cmd run build` before deployment. Ensure `.env.local` is never committed; `.gitignore` retains `.env.example` as the only tracked environment template.

## Security

`supabase/migrations/202610300001_initial.sql` establishes the initial relational entities and private-data RLS policies. Review and extend the administrator policies in Supabase before activating admin tooling.
