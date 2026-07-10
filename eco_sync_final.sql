-- ==========================================
-- ECO-SYNC MASTER DATABASE SETUP SCRIPT
-- Run this completely in your Supabase SQL Editor
-- ==========================================

-- 1. Create or Update Users Table
CREATE TABLE IF NOT EXISTS public.users (
    uid UUID PRIMARY KEY REFERENCES auth.users(id),
    full_name TEXT NOT NULL,
    address TEXT NOT NULL,
    district TEXT,
    role TEXT DEFAULT 'user',
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Safely add eco_points and district if they don't exist yet
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='eco_points') THEN
        ALTER TABLE public.users ADD COLUMN eco_points INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='district') THEN
        ALTER TABLE public.users ADD COLUMN district TEXT;
    END IF;
END $$;


-- 2. Create Waste Logs Table
CREATE TABLE IF NOT EXISTS public.waste_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(uid),
    category TEXT NOT NULL,
    weight_kg NUMERIC NOT NULL,
    points_earned INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- 3. Create Reports Table
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(uid),
    issue_type TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- 4. Create Reward Transactions Table
CREATE TABLE IF NOT EXISTS public.reward_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(uid),
    reward_name TEXT NOT NULL,
    cost INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create Alerts Table
CREATE TABLE IF NOT EXISTS public.alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waste_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;


-- 5. Drop old policies (to prevent conflicts if you ran scripts before)
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.users;

DROP POLICY IF EXISTS "Users can insert their own logs" ON public.waste_logs;
DROP POLICY IF EXISTS "Users can view their own logs" ON public.waste_logs;
DROP POLICY IF EXISTS "Users can insert reports" ON public.reports;
DROP POLICY IF EXISTS "Users can view their own reports" ON public.reports;
DROP POLICY IF EXISTS "Admins can view all reports" ON public.reports;


-- 6. Apply Correct Policies for Users
CREATE POLICY "Users can insert their own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = uid);
CREATE POLICY "Users can view their own profile" ON public.users FOR SELECT USING (auth.uid() = uid);
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = uid);

-- 7. Apply Correct Policies for Waste Logs
CREATE POLICY "Users can insert their own logs" ON public.waste_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own logs" ON public.waste_logs FOR SELECT USING (auth.uid() = user_id);

-- 9. Apply Correct Policies for Reports
CREATE POLICY "Users can insert reports" ON public.reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own reports" ON public.reports FOR SELECT USING (auth.uid() = user_id);

-- 10. Apply Correct Policies for Reward Transactions
CREATE POLICY "Users can insert their own transactions" ON public.reward_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own transactions" ON public.reward_transactions FOR SELECT USING (auth.uid() = user_id);

-- 11. Apply Correct Policies for Alerts
-- Anyone can read alerts (public or by district)
CREATE POLICY "Public can view alerts" ON public.alerts FOR SELECT USING (true);
-- Since we are doing presentation without a hardcoded admin, let public insert alerts
CREATE POLICY "Public can insert alerts" ON public.alerts FOR INSERT WITH CHECK (true);

-- 12. Fix generic read access for admins (assuming your admin relies on anon key)
-- Since your app doesn't have a hardcoded admin login yet, let's just make the analytics and reports readable to everyone for the presentation
CREATE POLICY "Public can view analytics" ON public.users FOR SELECT USING (true);
CREATE POLICY "Public can view reports" ON public.reports FOR SELECT USING (true);
CREATE POLICY "Public can view logs" ON public.waste_logs FOR SELECT USING (true);
CREATE POLICY "Public can update reports" ON public.reports FOR UPDATE USING (true);
