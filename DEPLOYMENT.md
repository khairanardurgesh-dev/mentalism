# Deployment Guide - MindMirror

This guide covers deploying the MindMirror application to production.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Neon, Supabase, Railway, or any PostgreSQL provider)
- Groq API key
- Razorpay account with API keys
- Vercel account (or preferred hosting platform)

## Database Setup

### Option 1: Neon (Recommended)

1. Create an account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string (format: `postgresql://username:password@host/database?sslmode=require`)

### Option 2: Supabase

1. Create an account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Also copy the `anon` key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Option 3: Railway

1. Create an account at [railway.app](https://railway.app)
2. Create a new PostgreSQL database
3. Copy the connection string

## Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Database (Required)
DATABASE_URL=postgresql://username:password@host/database?sslmode=require

# NextAuth (Required)
NEXTAUTH_SECRET=generate-a-random-secret-string
NEXTAUTH_URL=https://your-domain.com

# Google OAuth (Optional - for authentication)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Groq API (Required - for AI insights)
GROQ_API_KEY=your-groq-api-key

# Razorpay (Required - for payments)
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# PostHog (Optional - for analytics)
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Supabase (Optional - if using Supabase as database)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Generating NEXTAUTH_SECRET

Run this command to generate a secure random secret:

```bash
openssl rand -base64 32
```

## Prisma Setup

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma Client:
```bash
npx prisma generate
```

3. Run migrations:
```bash
npx prisma migrate dev
```

### Production Deployment

1. Generate Prisma Client:
```bash
npx prisma generate
```

2. Deploy migrations:
```bash
npx prisma migrate deploy
```

## Vercel Deployment

### Step 1: Connect to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

### Step 2: Deploy

1. Run the deployment command:
```bash
vercel
```

2. Follow the prompts:
   - Set project name (e.g., `mindmirror`)
   - Link to existing project or create new
   - Override build settings if needed

### Step 3: Configure Environment Variables in Vercel

1. Go to your project dashboard on Vercel
2. Navigate to Settings > Environment Variables
3. Add all the environment variables from the section above
4. Make sure to select all environments (Production, Preview, Development)

### Step 4: Add Post-Deploy Hook

In your Vercel project settings, add a post-deploy hook to run Prisma migrations:

```bash
npx prisma migrate deploy
```

### Step 5: Redeploy

After adding environment variables, redeploy:

```bash
vercel --prod
```

## Production Checklist

Before going live, verify:

- [ ] All environment variables are set in production
- [ ] Database connection string uses `sslmode=require`
- [ ] Prisma migrations have been deployed
- [ ] NEXTAUTH_SECRET is a strong random string
- [ ] NEXTAUTH_URL matches your production domain
- [ ] Groq API key is valid and has sufficient credits
- [ ] Razorpay keys are in live mode (not test mode)
- [ ] Custom domain is configured (if applicable)
- [ ] SSL certificate is active
- [ ] Build succeeds without warnings
- [ ] Test the complete user flow end-to-end

## Manual Deployment (Alternative)

If not using Vercel, you can deploy manually:

### Build the Application

```bash
npm run build
```

### Start the Production Server

```bash
npm start
```

Or use a process manager like PM2:

```bash
npm install -g pm2
pm2 start npm --name "mindmirror" -- start
```

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Ensure all dependencies are installed: `npm install`
2. Generate Prisma Client: `npx prisma generate`
3. Check TypeScript errors: `npx tsc --noEmit`

### Database Connection Issues

If the app can't connect to the database:

1. Verify DATABASE_URL is correct
2. Ensure SSL is enabled (`sslmode=require`)
3. Check database allows connections from your deployment IP
4. Verify database credentials are correct

### Environment Variable Issues

If environment variables are not loading:

1. Verify variable names match exactly (case-sensitive)
2. Check for typos in variable names
3. Ensure `.env` file is in project root
4. Restart the server after adding variables

### Prisma Migration Issues

If migrations fail:

1. Ensure DATABASE_URL is set
2. Run `npx prisma generate` first
3. Check database connection
4. Use `npx prisma migrate reset` to reset (WARNING: deletes data)

## Monitoring

### Recommended Tools

- **Vercel Analytics**: Built-in with Vercel deployment
- **PostHog**: For user analytics (if configured)
- **Sentry**: For error tracking (optional)
- **Database Monitoring**: Use your database provider's dashboard

## Security Best Practices

1. **Never commit `.env` files** - They are in `.gitignore`
2. **Rotate secrets regularly** - Update API keys periodically
3. **Use environment-specific secrets** - Different keys for dev/prod
4. **Enable SSL everywhere** - Force HTTPS connections
5. **Monitor for unusual activity** - Set up alerts for suspicious usage
6. **Keep dependencies updated** - Run `npm audit` regularly

## Scaling Considerations

As your application grows:

1. **Database**: Consider connection pooling (PgBouncer)
2. **CDN**: Use Vercel's built-in CDN for static assets
3. **Caching**: Implement Redis for session storage
4. **Load Balancing**: Vercel handles this automatically
5. **Monitoring**: Set up comprehensive logging

## Support

For issues or questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Check [Prisma documentation](https://www.prisma.io/docs)
- Review [Vercel deployment docs](https://vercel.com/docs)

## License

Proprietary - All rights reserved
