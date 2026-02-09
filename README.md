# VeriCred - Secure Digital Credential Vault

VeriCred is a modern, secure platform for storing, verifying, and sharing digital credentials with blockchain-backed authentication. Built with Next.js, Supabase, and the beautiful Bubblegum design system.

## Features

- **Secure Authentication** - Email/password authentication with Supabase
- **Credential Management** - Upload, organize, and manage your digital credentials
- **Blockchain Verification** - Hash-based verification system for credential authenticity
- **Public Profiles** - Share verified credentials with a public profile link
- **Credential Sharing** - Generate share codes to share credentials with others
- **Row Level Security** - Built-in RLS policies to protect user data
- **Beautiful UI** - Modern Bubblegum design system with pink, teal, and cream colors

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI components
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Blockchain**: SHA-256 based verification system

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in your Vercel project:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. Set up the database by running the migration scripts:
   - Execute `scripts/001_create_schema.sql` in your Supabase SQL editor
   - Execute `scripts/002_profile_trigger.sql` to set up auto-profile creation

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── auth/              # Authentication pages (login, signup)
├── dashboard/         # Main dashboard
├── credentials/       # Credential management
│   ├── page.tsx      # List credentials
│   ├── upload/       # Upload new credential
│   └── [id]/         # Credential detail & verification
├── profile/          # User profile management
│   ├── page.tsx      # Edit profile
│   └── [userId]/     # Public profile view
├── api/              # API routes
│   ├── credentials/  # Credential CRUD
│   ├── verify/       # Verification endpoints
│   └── public/       # Public API endpoints
└── page.tsx          # Landing page

lib/
├── supabase/         # Supabase client setup
├── blockchain.ts     # Blockchain verification utilities
└── utils.ts          # Utility functions

scripts/
├── 001_create_schema.sql    # Database schema
└── 002_profile_trigger.sql  # Profile creation trigger
```

## Key Features Explained

### Authentication
- Users can sign up with email and password
- Email confirmation required before full access
- Automatic profile creation on signup via database trigger
- Secure session management with HTTP-only cookies

### Credential Management
- Upload certificates, licenses, degrees, and skill badges
- Store metadata with each credential
- Delete credentials from your vault
- View credential details and blockchain hash

### Blockchain Verification
- Each credential gets a SHA-256 hash for verification
- Hash includes: credential ID, user ID, and timestamp
- Verification status displayed on credential detail page
- Share verification details with others via share codes

### Public Profiles
- Generate public profile URL: `/profile/[userId]`
- Display verified credentials on public profile
- Share profile link to prove credentials
- Profile includes full name, bio, and verified credentials list

### Row Level Security
- Users can only see their own credentials (or public ones)
- Users can only edit/delete their own profiles
- Verification records visible to credential owner and verifier
- Public data accessible without authentication

## Database Schema

### profiles
- `id` (UUID) - User ID from auth.users
- `full_name` (text)
- `username` (text, unique)
- `bio` (text)
- `avatar_url` (text)
- `created_at`, `updated_at` (timestamps)

### credentials
- `id` (UUID)
- `user_id` (UUID) - Reference to user
- `title` (text)
- `description` (text)
- `credential_type` (text)
- `issuer` (text)
- `issue_date` (timestamp)
- `expiration_date` (timestamp, optional)
- `credential_data` (JSONB)
- `file_url` (text)
- `blockchain_hash` (text)
- `is_public` (boolean)
- `created_at`, `updated_at` (timestamps)

### credential_shares
- `id` (UUID)
- `credential_id` (UUID)
- `shared_by_user_id` (UUID)
- `shared_with_user_id` (UUID)
- `share_token` (text, unique)
- `expires_at` (timestamp)
- `created_at` (timestamp)

### verification_records
- `id` (UUID)
- `credential_id` (UUID)
- `verifier_user_id` (UUID)
- `verification_status` (text)
- `verification_notes` (text)
- `verified_at` (timestamp)
- `created_at` (timestamp)

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Sign in
- `POST /api/auth/logout` - Sign out

### Credentials
- `GET /api/credentials` - List user credentials
- `POST /api/credentials` - Create credential
- `GET /api/credentials/[id]` - Get credential details
- `POST /api/credentials/[id]` - Verify credential
- `DELETE /api/credentials/[id]` - Delete credential

### Verification
- `POST /api/verify` - Create verification record
- `GET /api/verify?credentialId=[id]` - Get verification records

### Public
- `GET /api/public/profiles/[userId]` - Get public profile with credentials

## Design System - Bubblegum

VeriCred uses the beautiful Bubblegum design system with:

- **Primary**: Pink (#E94B89)
- **Secondary**: Teal (#6AC3C8)
- **Accent**: Soft Yellow (#E8DBA8)
- **Background**: Cream (#F7F5F0)
- **Soft rounded corners** on all components
- **Playful, modern aesthetic**

Colors are defined in `app/globals.css` as CSS variables for easy customization.

## Security Considerations

- Passwords hashed with bcrypt via Supabase
- Row Level Security (RLS) enforced at database level
- HTTP-only session cookies
- Email verification required for account activation
- User data isolated by RLS policies
- Blockchain hashes prevent credential tampering

## Future Enhancements

- Integration with actual blockchain networks (Ethereum, Polygon)
- File storage with Vercel Blob for credential documents
- Email verification notifications
- Two-factor authentication
- Credential templates
- Bulk credential upload
- Advanced search and filtering
- Credential expiration warnings
- Integration with third-party verification services

## Deployment

Deploy to Vercel with one click:

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

Environment variables needed:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For questions or issues, please reach out or open an issue on GitHub.

---

Built with ❤️ using Next.js, Supabase, and the Bubblegum design system.
