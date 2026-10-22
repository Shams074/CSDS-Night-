-- ==============================================================================
-- CSDS Department Welcome Party & Farewell Night Database Schema & Storage Setup
-- Location: Peshawar, Pakistan
-- ==============================================================================

-- 1. Create registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    section TEXT NOT NULL,
    semester INTEGER NOT NULL CHECK (semester >= 1 AND semester <= 8),
    cnic TEXT UNIQUE NOT NULL,
    screenshot_path TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    rejection_reason TEXT,
    approved_at TIMESTAMPTZ,
    email_sent_at TIMESTAMPTZ,
    reviewed_by TEXT
);

-- 2. Indexes for fast queries & lookups
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_cnic ON public.registrations(cnic);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies:
-- Policy A: Anyone can register (public INSERT only)
CREATE POLICY "Public registrations insert" 
ON public.registrations 
FOR INSERT 
WITH CHECK (true);

-- Policy B: No public SELECT allowed (CNIC and student details stay private)
-- Policy C: Only authenticated admins or service role can SELECT
CREATE POLICY "Admin select registrations" 
ON public.registrations 
FOR SELECT 
USING (
    auth.role() = 'authenticated' 
    OR auth.role() = 'service_role'
);

-- Policy D: Only authenticated admins or service role can UPDATE (Approve/Reject)
CREATE POLICY "Admin update registrations" 
ON public.registrations 
FOR UPDATE 
USING (
    auth.role() = 'authenticated' 
    OR auth.role() = 'service_role'
);

-- Policy E: Only authenticated admins or service role can DELETE
CREATE POLICY "Admin delete registrations" 
ON public.registrations 
FOR DELETE 
USING (
    auth.role() = 'authenticated' 
    OR auth.role() = 'service_role'
);

-- ==============================================================================
-- 5. Storage Bucket for Payment Screenshots (Private Bucket)
-- ==============================================================================

-- Create private bucket 'payment-proofs' if not exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'payment-proofs',
    'payment-proofs',
    false,
    5242880, -- 5 MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE 
SET public = false,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- Storage RLS: Public can upload their payment receipt
CREATE POLICY "Public upload payment screenshot" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
    bucket_id = 'payment-proofs'
);

-- Storage RLS: Only authenticated admins and service role can view / download
CREATE POLICY "Admin view payment screenshot" 
ON storage.objects 
FOR SELECT 
USING (
    bucket_id = 'payment-proofs' 
    AND (auth.role() = 'authenticated' OR auth.role() = 'service_role')
);
