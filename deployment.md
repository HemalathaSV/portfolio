# Deployment Guide - Vercel & Postgres

To ensure your portfolio content (projects, skills, etc.) persists and remains visible on Vercel, you need to connect a Postgres database. By default, the app uses in-memory storage which resets every time the server sleeps.

## Step 1: Create a Database
You can use any Postgres provider. Recommended options:
- **Vercel Postgres**: Integrated directly into your Vercel project.
- **Neon**: A popular serverless Postgres provider (free tier available).

## Step 2: Set Environment Variables
In your Vercel Project Settings -> Environment Variables, add the following:

- **Key**: `DATABASE_URL`
- **Value**: Your Postgres connection string (starts with `postgres://` or `postgresql://`).

## Step 3: Sync Database Schema
Before the data can be seeded, you need to ensure your database has the correct tables. Run the following command locally (ensure your `.env` has the same `DATABASE_URL`):

```bash
npx drizzle-kit push
```

## Step 4: Seed the Database
Once the `DATABASE_URL` is set, the schema is pushed, and you redeploy, the application will automatically:
1.  Connect to your database.
2.  Initialize/check the tables.
3.  Seed all the initial data (projects, skills, education, etc.) during the first request if they are empty.

## Step 5: Redeploy
After adding the variable and pushing the schema, trigger a new deployment on Vercel.

> [!NOTE]
> If you are using **Vercel Postgres**, you can use the "Storage" tab in the Vercel dashboard to create a database and click "Connect" to automatically add the environment variables for you.
