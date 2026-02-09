# Sakshya - Production Ready Setup

## Project Overview

Sakshya is a digital credential verification platform that allows users to securely store, manage, and share verified credentials using blockchain technology. The app is built with Next.js 16, Supabase for authentication and database, and the Bubblegum design system.

## Key Features Implemented

### 1. **Authentication System**
- Sign-up page (`/auth/sign-up`) with email/password registration
- Login page (`/auth/login`) with persistent session management
- Sign-up success page (`/auth/sign-up-success`) with confirmation flow
- Logout functionality integrated into protected pages

### 2. **Dashboard** (`/dashboard`)
- Welcome screen showing user email
- Quick access cards for:
  - My Credentials (view stored credentials)
  - Upload Credential (add new files)
  - My Profile (edit public profile)
  - Support (help resources)
- Quick stats showing counts for stored credentials, verifications, and shares

### 3. **Credentials Management**
- **Credentials Page** (`/credentials`): List all stored credentials with upload button
- **Upload Page** (`/credentials/upload`): Form to upload new documents with title, description, and file support
- Empty state UI with helpful call-to-action

### 4. **User Profiles**
- **Edit Profile** (`/profile`): Users can update display name, bio, and view their public profile URL
- **Public Profile** (`/profile/[userId]`): Shareable public profile page showing credentials to verify users

### 5. **Landing Page** (`/`)
- Hero section with value proposition
- Feature showcase with visual cards
- 4-step "How It Works" section
- Call-to-action section
- Comprehensive footer with links

## File Structure

```
app/
├── page.tsx (Landing page)
├── layout.tsx (Root layout)
├── globals.css (Styling)
├── auth/
│   ├── login/page.tsx
│   ├── sign-up/page.tsx
│   └── sign-up-success/page.tsx
├── dashboard/page.tsx
├── credentials/
│   ├── page.tsx
│   └── upload/page.tsx
├── profile/
│   ├── page.tsx
│   └── [userId]/page.tsx
└── api/
    ├── auth/
    │   └── logout/route.ts
    └── (other API routes as needed)

lib/
├── supabase/
│   ├── client.ts (Browser client)
│   └── server.ts (Server client)
└── utils.ts

components/
├── ui/ (shadcn components)
└── (custom components)
```

## Design System (Bubblegum)

The app uses the Bubblegum design system with:
- **Primary Color**: Brand primary color (buttons, headings, accents)
- **Secondary Color**: Complementary accent color (alternative actions)
- **Accent Color**: Highlight color for CTAs
- **Neutral Colors**: White, grays, and black variants for text and backgrounds

All components use Tailwind CSS with HSL color variables (`hsl(var(--primary))`, etc.)

## Authentication Flow

1. **Sign Up**: User creates account → verification email sent → redirected to success page
2. **Login**: User enters credentials → Supabase authenticates → redirected to dashboard
3. **Protected Routes**: Dashboard, credentials, and profile pages check auth status
4. **Logout**: User clicks logout button → session cleared → redirected to home

## Database Schema (Recommended)

```sql
-- Users table (managed by Supabase Auth)
-- profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE,
  full_name TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- credentials table
CREATE TABLE credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  blockchain_hash TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy automatically on push

### Option 2: Docker/Self-hosted
1. Build: `npm run build`
2. Start: `npm start`
3. Ensure environment variables are set

## Next Steps for Production

1. **Database Setup**: Create Supabase tables using the schema above
2. **Email Verification**: Configure Supabase email templates
3. **File Storage**: Set up Supabase Storage for credential uploads
4. **Blockchain Integration**: Implement actual blockchain verification (e.g., Polygon)
5. **Monitoring**: Add Sentry or similar for error tracking
6. **Analytics**: Add analytics to track user behavior
7. **Testing**: Add unit and integration tests
8. **Security**: Implement rate limiting and CORS policies

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Features Ready for Expansion

- Export credentials as PDF
- Share credentials with specific users
- Blockchain verification badges
- Integration with LinkedIn/resume
- Multi-factor authentication
- Organization/team management
- Credential templates
- Automated certificate parsing
