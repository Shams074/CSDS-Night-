# CSDS Welcome Party & Farewell Night 2026

A production-ready event and student registration web platform for the **Department of Computer Science & Data Science (CSDS)**, held in **Peshawar, Khyber Pakhtunkhwa, Pakistan**.

Students explore event details, schedule, Peshawari cultural feast, and register by paying **Rs. 2,200 per person** and uploading proof of payment. Organizers review registrations, approve/reject them in a dedicated administrative portal, and approved students automatically receive an official branded confirmation email containing their digital entry pass and scanned QR ticket.

---

## 🌟 Key Highlights & Design System

- **Minimalist Underground & Electric Aesthetics**:
  - **Color Palette**: Deep Obsidian Black (`#070707`), Electric Lime (`#B4F23D`), Muted Lime (`#88C822`), Dark Card Surfaces (`#121212`, `#1A1A1A`), and Pure White.
  - **Typography**: **Poppins** (`font-display`) for high-impact uppercase condensed headlines and buttons; **Mulish** (`font-body`) for ultra-clean, readable editorial body and metadata.
  - **Numbered Tagging**: Bold editorial indexing across all sections (`[01]`, `[02]`, `[03]...`).
  - **Minimalist Mobile First**: Clean border lines, sleek floating top bar, full mobile drawer, tap-friendly action buttons, and high contrast for outdoor and mobile reading.
  - **Centralized Photo Customization**: Zero hardcoded images in components. All pictures can be replaced in one place (`src/config/event.ts`) or dropped into `public/images/`. Refer to `public/images/PHOTO_SLOTS_GUIDE.md` for exact dimensions.
- **Student Registration Flow (`/register`)**:
  - Clear **Rs. 2,200** fee breakdown and payment instructions (Meezan Bank, Easypaisa, JazzCash) with one-click copyable account numbers.
  - Complete form: Full Name, Email, Section (A, B, C, D), Semester (1 to 8), auto-formatting 13-digit CNIC (`12345-1234567-1`), and drag-and-drop payment receipt uploader (JPG/PNG/WebP, max 5 MB with instant preview).
  - Anti-duplicate guard (rejects duplicate email and duplicate CNIC).
  - Honeypot anti-spam protection and rate limiting.
  - Uploads screenshots to private Supabase Storage bucket (`payment-proofs`).
  - Interactive success screen with festive confetti.
- **Administrative Portal (`/admin`)**:
  - Secure login at `/admin/login` protected by server-side proxy middleware, session checks, and an admin allowlist (`ADMIN_EMAILS`).
  - Real-time statistics: Total Applied, Pending, Approved, Rejected, and Verified Funds (Rs.).
  - Searchable, filterable table (by status, section, semester) with date sorting and pagination.
  - **CNIC Privacy**: CNIC is masked in list tables (`17301-*******-3`) and visible only in the row detail modal.
  - Detail review modal with short-lived signed URLs for receipt screenshots and full click-to-zoom lightbox.
  - Actions: One-click Approve (dispatches entry pass email), Reject (with optional reason and notice email), Bulk Approve, and Resend Pass Email.
  - One-click **CSV Export** for venue entry coordinators.
- **Transactional Email**:
  - Responsive HTML email templates with event branding, unique Registration ID, and embedded scannable entry QR codes.

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, latest stable with React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom hard offset shadows and design tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms & Validation**: `react-hook-form` + [Zod](https://zod.dev/)
- **Database & Storage**: [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Storage Buckets, Auth)
- **Email**: [Resend](https://resend.com/) (with local development simulation fallback)
- **Delight & Utility**: `canvas-confetti` + `qrcode`
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Step-by-Step Setup Guide

### 1. Prerequisites
- Node.js 18.x or 20.x+ installed (`node -v`)
- npm or yarn

### 2. Clone & Install
```bash
git clone <your-repo-url>
cd "party night"
npm install --legacy-peer-deps
```

### 3. Environment Variables Configuration
Copy the provided `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your actual API keys in `.env.local`:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Admin Portal Allowlist (Comma-separated emails authorized to access /admin)
ADMIN_EMAILS=admin@csds.uop.edu.pk,president.csds@gmail.com

# Transactional Email (Resend)
RESEND_API_KEY=re_123456789_abcdefg
RESEND_FROM_EMAIL="CSDS Peshawar <onboarding@resend.dev>"

# Site URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note**: If you run the project without configuring Supabase or Resend keys, the application automatically activates **Development Simulation Mode**: it uses safe in-memory storage, mock data, and console email logging so that all UI, registration, approvals, and filters can be tested end-to-end immediately!

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public landing page.

---

## 🗄 Database & Storage Setup (Supabase)

A ready-to-run SQL migration script is located in:
[`supabase/migrations/20261022000000_create_registrations.sql`](supabase/migrations/20261022000000_create_registrations.sql)

### Running the Migration:
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open your project and navigate to the **SQL Editor**.
3. Copy and paste the entire contents of `supabase/migrations/20261022000000_create_registrations.sql` and click **Run**.
4. This script will automatically:
   - Create the `public.registrations` table with UUID keys, unique constraints on `email` and `cnic`, and status checks (`pending`, `approved`, `rejected`).
   - Create performance indexes on `email`, `cnic`, `status`, and `created_at`.
   - Enable **Row Level Security (RLS)** with policies permitting public `INSERT` while restricting `SELECT` and `UPDATE` exclusively to authenticated administrators and the service role.
   - Create the private `payment-proofs` Storage Bucket with a 5 MB file size limit and strict image MIME filters.

---

## 🔐 Creating the Admin User in Supabase

1. In your Supabase Dashboard, go to **Authentication** -> **Users**.
2. Click **Add User** -> **Create User**.
3. Enter the administrator email (e.g. `admin@csds.uop.edu.pk`) and choose a strong password.
4. Toggle **Auto Confirm User** to `ON` and save.
5. Ensure this email is listed in `ADMIN_EMAILS` in `.env.local` (or your Vercel Environment Variables).
6. Log in at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

> In local simulation mode (without live Supabase credentials), you can sign in directly using:
> - **Email**: `admin@csds.uop.edu.pk`
> - **Password**: `admin12345`

---

## ✉️ Email Configuration (Resend)

1. Create a free account at [resend.com](https://resend.com).
2. Generate an API Key under **API Keys**.
3. Add `RESEND_API_KEY=re_...` to `.env.local`.
4. If testing with Resend's free tier, set `RESEND_FROM_EMAIL="CSDS Peshawar <onboarding@resend.dev>"` (or use your verified custom domain once added).
5. When a registration is approved on the admin dashboard, Resend immediately dispatches the styled HTML entry ticket with QR code.
6. If an email fails to send due to a network or DNS hiccup, the admin table marks the error and displays a **Resend Entry Pass Email** button to retry at any time.

---

## ⚙️ Editing Event Details, Schedule, Fee & Imagery

All event content is centralized in a single configuration file:
[`src/config/event.ts`](src/config/event.ts)

You can update:
- **Title, Tagline, Venue, Date, Time & Countdown Target**:
  - `EVENT_CONFIG.title`
  - `EVENT_CONFIG.date`
  - `EVENT_CONFIG.time`
  - `EVENT_CONFIG.venue`
  - `EVENT_CONFIG.countdownTarget`
- **Registration Fee & Bank Accounts**:
  - `EVENT_CONFIG.fee.amount`
  - `EVENT_CONFIG.fee.accounts` (Meezan Bank, Easypaisa, JazzCash titles and account numbers)
- **Sections & Semesters**:
  - `EVENT_CONFIG.sections`: `["A", "B", "C", "D"]`
  - `EVENT_CONFIG.semesters`: `[1, 2, 3, 4, 5, 6, 7, 8]`
- **Highlights & Detail Tabs**:
  - `EVENT_CONFIG.highlights` (Food, Live Music, Attan, Games, Awards, Photo Booth)
  - `EVENT_CONFIG.detailTabs` (Curated cards for Peshawari food, folk music, and activities)
- **Poster Schedule**:
  - `EVENT_CONFIG.schedulePosters` (Phase I, Phase II, Phase III)
  - `EVENT_CONFIG.fullSchedule` (Complete chronological timeline)
- **Peshawar Heritage Gallery**:
  - `EVENT_CONFIG.gallery` (Landmarks, photography, locations, and descriptions)
- **FAQs & Organizer Directory**:
  - `EVENT_CONFIG.faqs`
  - `EVENT_CONFIG.contactRows`

Photo licenses and credits are documented in [`CREDITS.md`](CREDITS.md).

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/new), click **Add New Project** and import your repository.
3. In **Environment Variables**, add the production keys:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAILS`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `NEXT_PUBLIC_APP_URL` (set to your Vercel deployment URL, e.g. `https://csds-night-2026.vercel.app`)
4. Build command: `npm run build`
5. Click **Deploy**. Vercel will build and launch your production site with automated SSL, edge routing, and image optimization.

---

## 🛡️ Security & Privacy Guardrails

- **Sensitive CNIC Protection**: Computerized National Identity Cards are never rendered publicly or exposed via client-side endpoints. In the administrative table, numbers are strictly masked (`17301-*******-3`) and only decrypted in the admin's detail inspection modal.
- **Strict Row Level Security (RLS)**: Public visitors can only execute `INSERT` statements with `pending` status. No student record or payment screenshot can be selected, edited, or deleted without service role or authenticated admin credentials.
- **Private Storage Bucket**: The `payment-proofs` bucket is private. Screenshots are served exclusively through short-lived, cryptographically signed URLs generated on-demand by the server.
- **Server-Side Zod Validation & Rate Limiting**: All form submissions undergo dual validation (client-side and server-side) with bot honeypots and IP rate limiting to stop spam submissions.

---

## 📄 License & Credits
Organized by the **CSDS Student Society**, Department of Computer Science & Data Science, Peshawar, Pakistan. Built for university community use.
