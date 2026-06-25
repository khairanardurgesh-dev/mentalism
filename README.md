# MindMirror

AI-Powered Digital Mentalism Experience (Entertainment SaaS)

An interactive experiment using psychology and patterns that creates the feeling of an impossible mind-reading experience.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS, Framer Motion, Zustand
- **Backend**: Node.js, PostgreSQL, Prisma ORM
- **Authentication**: NextAuth (Google Login, Phone OTP, Guest Mode)
- **Payments**: Razorpay
- **AI**: Groq API
- **Analytics**: PostHog
- **Hosting**: Vercel, Supabase Database

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Groq API key
- Razorpay account

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
```

Edit `.env` with your actual values:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret string
- `NEXTAUTH_URL` - Your app URL
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GROQ_API_KEY` - Groq API key
- `RAZORPAY_KEY_ID` - Razorpay key ID
- `RAZORPAY_KEY_SECRET` - Razorpay key secret

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── experiment/        # Question flow page
│   ├── analyzing/         # Analysis animation page
│   ├── results/           # Results page
│   └── admin/             # Admin dashboard
├── components/            # React components
├── lib/                   # Utility functions
│   ├── questions.ts       # Question definitions
│   ├── psychologyEngine.ts # Personality scoring
│   ├── auth.ts           # Authentication config
│   ├── prisma.ts         # Prisma client
│   └── sound.ts          # Sound management
└── store/                # Zustand stores
```

## Features

- **8-question psychological assessment**
- **AI-generated personality insights** using Groq
- **8 personality archetypes** with detailed readings
- **Freemium model** with paywall
- **Razorpay integration** for payments
- **Shareable result cards** for social media
- **Admin dashboard** for analytics
- **Sound design** with toggle
- **Mobile-first** responsive design
- **PWA support** for mobile installation

## Design Philosophy

The product feels:
- Mysterious
- Premium
- Magical
- Personal
- Trustworthy

Color Palette:
- Primary: #1C1638 (Deep Purple)
- Secondary: #0B1026 (Dark Blue)
- Accent: #D4AF37 (Gold)
- Background: #050505

## Legal Disclaimer

This experience is for entertainment and self-reflection purposes only and does not provide psychological, medical, financial, or supernatural advice.

## Deployment

Deploy on Vercel:

```bash
vercel
```

Make sure to set environment variables in your Vercel project settings.

## License

Proprietary - All rights reserved
