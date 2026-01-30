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

## Step 3: Seed the Database
Once the `DATABASE_URL` is set and you redeploy, the application will automatically:
1.  Connect to your database.
2.  Initialize the tables.
3.  Seed all the initial data (projects, skills, education, etc.) during the first request.

## Step 4: Redeploy
After adding the variable, trigger a new deployment on Vercel.

> [!NOTE]
> If you are using **Vercel Postgres**, you can use the "Storage" tab in the Vercel dashboard to create a database and click "Connect" to automatically add the environment variables for you.
