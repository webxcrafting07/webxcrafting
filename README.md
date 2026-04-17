# WebXCrafting — Premium Agency Website

A full-stack Next.js agency platform with MongoDB, JWT auth, Framer Motion animations, and a complete admin dashboard.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + custom CSS
- **Animation:** Framer Motion
- **Database:** MongoDB with Mongoose
- **Auth:** JWT + HTTP-only cookies
- **Deployment:** Vercel

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
The `.env.local` file is pre-configured with your MongoDB URI. Verify it looks like:
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=webcraft_super_secret_jwt_key_2025_!@
ADMIN_EMAIL=webxcrafting@gmail.com
ADMIN_PASSWORD= [PASSWORD]
NEXT_PUBLIC_WHATSAPP_NUMBER=919000000000
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hello%20I%20want%20a%20website
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 4. Seed the database (run once!)
After the server starts, open a new terminal and run:
```bash
curl -X POST http://localhost:3000/api/seed
```
Or visit `http://localhost:3000/api/seed` and POST to it.

This creates:
- Admin account (webxcrafting@gmail.com / Admin@123)
- 4 default services
- 6 sample projects

---

## Pages

| Route | Description |
|---|---|
| `/` | Home page |
| `/about` | About the agency |
| `/services` | Pricing & services |
| `/portfolio` | Project showcase with filters |
| `/contact` | Contact form (saves to MongoDB) |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Full admin panel |

## API Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth` | — | Admin login |
| GET | `/api/auth` | — | Verify token |
| DELETE | `/api/auth` | — | Logout |
| GET | `/api/projects` | — | Get all projects |
| POST | `/api/projects` | ✅ Admin | Create project |
| PUT | `/api/projects/:id` | ✅ Admin | Update project |
| DELETE | `/api/projects/:id` | ✅ Admin | Delete project |
| POST | `/api/leads` | — | Submit contact form |
| GET | `/api/leads` | ✅ Admin | Get all leads |
| PUT | `/api/leads/:id` | ✅ Admin | Update lead status |
| DELETE | `/api/leads/:id` | ✅ Admin | Delete lead |
| GET | `/api/services` | — | Get all services |
| POST | `/api/services` | ✅ Admin | Create service |
| PUT | `/api/services/:id` | ✅ Admin | Update service |
| DELETE | `/api/services/:id` | ✅ Admin | Delete service |

---

## Deploy to Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → Import the repo
3. Add all environment variables from `.env.local` in the Vercel dashboard
4. Deploy!
5. After deployment, seed the production DB:
   ```
   curl -X POST https://your-domain.vercel.app/api/seed
   ```

---

## Customization

### Change WhatsApp number
Update `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`

### Change admin credentials
1. Update `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`
2. Re-run the seed: `curl -X POST /api/seed`

### Add your real projects
Log in to `/admin/dashboard` → Projects → Add Project

---

## Security Notes

⚠️ **Important:** Rotate your MongoDB password after setup since it was shared in a chat session.
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Database Access → Edit User → Change Password
3. Update `MONGODB_URI` in `.env.local` and Vercel environment variables

---

## Folder Structure

```
webcraft/
├── app/
│   ├── page.tsx                  # Home
│   ├── HomeClient.tsx
│   ├── about/
│   ├── services/
│   ├── portfolio/
│   ├── contact/
│   ├── admin/
│   │   ├── login/
│   │   └── dashboard/
│   ├── api/
│   │   ├── auth/route.ts
│   │   ├── projects/
│   │   ├── leads/
│   │   ├── services/
│   │   └── seed/route.ts
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── DotBackground.tsx
│   └── WhatsAppButton.tsx
├── lib/
│   ├── db.ts                     # MongoDB connection
│   └── auth.ts                   # JWT utilities
├── models/
│   ├── Admin.ts
│   ├── Project.ts
│   ├── Lead.ts
│   └── Service.ts
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.js
└── package.json
```
