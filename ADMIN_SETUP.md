# Spleux Admin Dashboard Setup Guide

This guide will help you set up the admin dashboard for your Spleux website, allowing you to edit content directly through a web interface without databases or third-party services.

## Features

- ✅ **No Database Required** - Content stored in code files
- ✅ **Simple Email/Password Authentication** - Secure login with hardcoded credentials
- ✅ **Direct Content Editing** - Edit pricing, FAQ, links, and hero content
- ✅ **Auto-Deployment** - Changes automatically trigger website rebuilds
- ✅ **Live Preview** - See changes before saving
- ✅ **Mobile Responsive** - Manage content from any device

## Setup Instructions

### 1. Configure Admin Credentials

Create a `.env.local` file in your project root with your admin credentials:

```bash
# Admin Authentication (Required)
ADMIN_EMAIL=admin@spleux.com
ADMIN_PASSWORD=your_secure_password_here
ADMIN_NAME=Spleux Admin

# JWT Secret (Required for security)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**Important Security Notes:**
- Use a strong, unique password
- Generate a secure JWT secret (at least 32 characters)
- Never commit the `.env.local` file to version control

### 2. Set Up Deployment (Choose One)

#### Option A: Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add your environment variables to Vercel:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add the same variables from your `.env.local` file
3. Optional: Add GitHub Actions secrets for automated deployment:
   ```
   VERCEL_TOKEN=your_vercel_token
   VERCEL_ORG_ID=your_vercel_org_id
   VERCEL_PROJECT_ID=your_vercel_project_id
   ```

#### Option B: Netlify

1. Connect your GitHub repository to Netlify
2. Add your environment variables to Netlify:
   - Go to Netlify Dashboard → Your Site → Site Settings → Environment Variables
   - Add the same variables from your `.env.local` file
3. Optional: Uncomment the Netlify section in `.github/workflows/deploy.yml`

### 3. Deploy Your Changes

1. Commit and push all changes to your main branch
2. Visit `https://your-domain.com/admin` to access the admin dashboard
3. Login with your configured email and password

## How It Works

### Authentication Flow
1. User visits `/admin` and enters email/password
2. Server validates credentials against environment variables
3. Server generates JWT token for session management
4. User gets access to admin dashboard with valid token

### Content Management Flow
1. Admin edits content in the dashboard
2. Clicking "Save Changes" updates the local content file
3. Changes are immediately reflected on the website
4. Optional: Set up auto-deployment for production environments

### Content Structure

All editable content is stored in `src/data/content.json`:

```json
{
  "pricing": {
    "title": "Section title",
    "plans": [...],
    "freeTrial": {...}
  },
  "faq": [...],
  "links": {
    "primary": {...},
    "footer": {...}
  },
  "hero": {...},
  "cta": {...}
}
```

## Security Features

- **Environment-Based Authentication**: Credentials stored securely in environment variables
- **JWT Token Security**: Secure session management with expiring tokens
- **Server-Side Validation**: All authentication handled server-side
- **No Database Vulnerabilities**: No database means no SQL injection risks

## Admin Dashboard Features

### Pricing Management
- Edit section title and subtitle
- Modify pricing plans (price, period, description, CTA)
- Update free trial information

### FAQ Management
- Add/remove FAQ items
- Edit questions and answers
- Reorder FAQ items

### Links Management
- Update primary links (Telegram contact/academy)
- Edit footer links (company and legal sections)
- Change URLs and link text

### Hero & CTA Management
- Edit hero title and subtitle
- Update statistics (win rate, members, etc.)
- Modify call-to-action content

### Preview Mode
- Toggle between edit and preview modes
- See exactly how changes will look
- No need to save to preview

## Troubleshooting

### "Invalid credentials" error
- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set correctly in environment variables
- Check that environment variables are loaded properly in your deployment
- Ensure no extra spaces or characters in the credentials

### "Server configuration error"
- Make sure all required environment variables are set
- Verify `JWT_SECRET` is configured
- Check that environment variables are available in your deployment platform

### "Failed to update content" error
- Check file permissions in your deployment environment
- Verify the content.json file is writable
- Check server logs for detailed error messages

### Session expires quickly
- Verify `JWT_SECRET` is consistent across restarts
- Check if environment variables are being reset
- Token expires after 24 hours by default

## Usage Tips

1. **Test First**: Use preview mode to see changes before saving
2. **Small Changes**: Make incremental changes rather than large overhauls
3. **Backup**: GitHub automatically keeps version history
4. **Mobile Friendly**: Admin dashboard works well on mobile devices
5. **Team Access**: Add team members as collaborators to the GitHub repo

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all environment variables are set
3. Check GitHub repository settings and permissions
4. Review GitHub Actions logs for deployment issues

The admin dashboard provides a simple, secure way to manage your website content without technical complexity while maintaining full control over your data and deployment process.