# Next.js + Better Auth Boilerplate

A minimal Next.js 16 boilerplate with [Better Auth](https://better-auth.com), Drizzle ORM, and PostgreSQL.

Includes email/password and GitHub OAuth out of the box.

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

- Set `BETTER_AUTH_SECRET` to a secure random string
- Add your GitHub OAuth credentials (or skip if using email/password only)

### 3. Start the database

```bash
docker compose up -d
```

### 4. Run migrations

```bash
pnpm drizzle-kit push
```

### 5. Start the dev server

```bash
pnpm dev
```

Open http://localhost:3000

## OAuth Only (disable email/password)

To use only GitHub OAuth, edit `lib/auth/index.ts`:

```ts
emailAndPassword: {
  enabled: false,
},
```

## Email/Password Only (disable OAuth)

Remove the `socialProviders` block from `lib/auth/index.ts` and remove the GitHub sign-in button from your UI.
