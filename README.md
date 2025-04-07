# Password Manager - Deployment Guide

This guide provides instructions for deploying the Password Manager application to Vercel and troubleshooting common issues.

## Table of Contents
- [Fixing the 401 Unauthorized Error](#fixing-the-401-unauthorized-error)
- [Fixing the Missing Image Issue](#fixing-the-missing-image-issue)
- [Vercel Deployment Steps](#vercel-deployment-steps)
- [Environment Variables Configuration](#environment-variables-configuration)
- [MongoDB Atlas Configuration](#mongodb-atlas-configuration)

## Fixing the 401 Unauthorized Error

The 401 Unauthorized error during login after deployment to Vercel is typically caused by one of the following issues:

1. **Incorrect MongoDB Connection String**: The connection string in Vercel's environment variables might be different from your local environment or improperly formatted.

2. **Missing NextAuth Configuration**: Proper configuration of NextAuth secrets and URLs is required in production.

3. **MongoDB Atlas IP Access Restrictions**: Your MongoDB Atlas cluster might be restricting access from Vercel's servers.

### Solution:

We've updated the following files to address authentication issues:

- `app/api/auth/[...nextauth]/route.ts`: Enhanced error handling in the authentication flow
- `lib/db.ts`: Improved database connection initialization with better error reporting
- `app/(auth)/login/LoginForm/LoginForm.tsx`: Added better error handling in the login form

## Fixing the Missing Image Issue

The issue with the background image not appearing on the login page is related to how Next.js handles static assets in production environments.

### Solution:

We've updated the following files to fix the image loading:

- `app/(auth)/login/ImageAuth/ImageAuth.tsx`: Replaced CSS background with Next.js Image component
- `next.config.ts`: Added configurations to better handle static images

The key changes include:
1. Using the Next.js `Image` component with `priority` flag for preloading
2. Setting `unoptimized: true` in the Next.js config for public images
3. Adding `output: 'standalone'` to improve Vercel deployment

## Vercel Deployment Steps

1. **Push your changes to GitHub**:
   ```bash
   git add .
   git commit -m "Fix authentication and image loading issues"
   git push
   ```

2. **Import your project in Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure the project**:
   - Keep default build settings
   - Add all environment variables (see next section)
   - Click "Deploy"

4. **Verify deployment**:
   - Once deployment is complete, click on the preview URL
   - Test login functionality
   - Check if the background image appears correctly

## Environment Variables Configuration

Ensure the following environment variables are set in Vercel:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MongoDB connection string | `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority` |
| `NEXTAUTH_JWT_SECRET` | Secret for JWT tokens | A random string (e.g., `your-jwt-secret-key`) |
| `NEXTAUTH_SECRET` | Secret for NextAuth | A random string (e.g., `your-nextauth-secret-key`) |
| `NEXTAUTH_URL` | Your deployment URL | `https://your-app.vercel.app` |

You can add these in the Vercel dashboard:
1. Go to your project settings
2. Click on "Environment Variables"
3. Add each variable with its corresponding value
4. Save and redeploy if necessary

**Important**: For `NEXTAUTH_URL`, use your actual Vercel deployment URL (e.g., `https://password-manager-yourusername.vercel.app`).

## MongoDB Atlas Configuration

To ensure MongoDB Atlas works correctly with Vercel:

1. **Allow access from anywhere** (for testing):
   - Go to MongoDB Atlas dashboard
   - Navigate to Network Access
   - Add IP Address: `0.0.0.0/0` (allows access from anywhere)
   - For production, you may want to restrict to Vercel IP ranges

2. **Verify user permissions**:
   - Make sure your MongoDB user has read/write access to the database
   - In MongoDB Atlas, go to Database Access
   - Verify that your user has the appropriate permissions

3. **Check database and collection names**:
   - Ensure your database name matches what's in your connection string
   - Confirm all collections exist as expected

## Troubleshooting

If you still encounter issues:

1. **Check Vercel logs**:
   - Go to your project dashboard in Vercel
   - Click on "Deployments" and select the latest deployment
   - Click on "Functions" to view function logs
   - Look for error messages related to authentication or image loading

2. **Test database connection**:
   - Create a simple API endpoint to test database connectivity
   - Check if the connection succeeds from Vercel's environment

3. **Verify image paths**:
   - Ensure all images are in the correct location in the `public` directory
   - Check that image paths are correctly referenced in the code

4. **Debug authentication**:
   - Set `debug: true` in NextAuth configuration temporarily
   - Check logs for detailed authentication flow information

If you need further assistance, please provide the specific error messages from the Vercel logs.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
