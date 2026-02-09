# Sakshya - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Clone and Install (1 min)
```bash
cd your-project-directory
npm install
```

### Step 2: Setup Supabase (2 min)

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a free account
4. Create a new project (use "Free" tier)
5. Wait for setup to complete
6. Go to Project Settings → API
7. Copy `Project URL` and `Anon Public Key`

### Step 3: Configure Environment (30 sec)

Create `.env.local` file in project root:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 4: Run Development Server (1 min)
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser

### Step 5: Test the App (30 sec)

1. Click "Get Started" on the landing page
2. Sign up with email and password
3. Verify email (check spam folder!)
4. Log in with your credentials
5. Explore the dashboard!

## 📁 Project Structure Quick Reference

```
app/
├── page.tsx           ← Landing page
├── layout.tsx         ← Root layout with auth setup
├── auth/
│   ├── sign-up/       ← Registration
│   ├── login/         ← Login
│   └── sign-up-success/ ← Email verification screen
├── dashboard/         ← User home
├── credentials/       ← Credential management
│   └── upload/        ← Upload form
└── profile/           ← User profile
```

## 🎨 Customizing the Design

### Change Primary Color
Edit `tailwind.config.ts`:
```ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(YOUR_HUE 90% 50%)',
      }
    }
  }
}
```

### Update Brand Name
Find "Sakshya" in these files and replace:
- `app/page.tsx` (landing page)
- `app/layout.tsx` (site title)
- `app/dashboard/page.tsx` (app name)

### Customize Logo
Replace the CheckCircle icon in `app/page.tsx` line 15:
```tsx
import { YourIcon } from 'lucide-react'
<YourIcon className="w-6 h-6 text-primary-foreground" />
```

## 🔧 Common Tasks

### Add a New Page
```bash
# Create new folder structure
mkdir -p app/new-page

# Create page file
touch app/new-page/page.tsx
```

### Add New Database Table
1. Go to Supabase dashboard
2. Click "SQL Editor"
3. Create new query
4. Write your SQL
5. Execute

### Change Colors

Edit `app/globals.css`:
```css
:root {
  --primary: 250 84% 54%;      /* Brand color */
  --secondary: 264 90% 63%;    /* Accent */
  --accent: 220 90% 56%;       /* CTA */
}
```

## 🐛 Troubleshooting

### "Supabase URL not configured"
- Check `.env.local` file exists
- Verify `NEXT_PUBLIC_SUPABASE_URL` is set
- Restart dev server: `Ctrl+C` then `npm run dev`

### "Email verification not working"
- Check spam/promotions folder
- Go to Supabase → Email Templates → verify
- Configure SMTP if needed

### "Can't upload files"
- Create bucket in Supabase → Storage
- Name it `credentials`
- Set to public with authentication

### "Pages show 404"
- Ensure all routes are created correctly
- Check file names (lowercase, exact match)
- Verify `layout.tsx` is in app root

## 📚 Important Files to Know

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout, global setup |
| `app/globals.css` | Global styles |
| `lib/supabase/client.ts` | Supabase browser client |
| `.env.local` | Environment variables (git ignored) |
| `next.config.mjs` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |

## 🚢 Deploy to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial Sakshya setup"
git remote add origin https://github.com/yourname/vericred.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repo
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

Done! Your app is live! 🎉

## 📖 Additional Resources

- **Setup Details**: See `VERICRED_SETUP.md`
- **Production Checklist**: See `PRODUCTION_CHECKLIST.md`
- **Full Project Summary**: See `PROJECT_SUMMARY.md`
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## 💬 Need Help?

1. Check the docs files included with the project
2. Review error messages carefully
3. Check browser console for specific errors
4. Verify environment variables are set
5. Restart the dev server

## ✅ Verification Checklist

Before considering the project "complete":
- [ ] Signed up successfully
- [ ] Verified email
- [ ] Logged in successfully
- [ ] Dashboard displays correctly
- [ ] Profile page loads
- [ ] Upload page accessible
- [ ] Logout works

## 🎯 Next Steps

1. **Local Testing** (5 min)
   - Test all auth flows
   - Verify pages load correctly
   - Check responsive design on mobile

2. **Database Setup** (10 min)
   - Create required tables
   - Set up file storage bucket
   - Configure email templates

3. **Customization** (30 min)
   - Update brand name/colors
   - Add your logo
   - Customize copy/text

4. **Deployment** (15 min)
   - Push to GitHub
   - Deploy to Vercel
   - Add production env vars
   - Test live app

5. **Features** (Optional)
   - Add blockchain integration
   - Implement credential sharing
   - Add analytics
   - Set up monitoring

---

**You're all set!** Start developing with:
```bash
npm run dev
```

Happy coding! 🚀
