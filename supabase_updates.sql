-- 1. Add eco_points to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS eco_points INTEGER DEFAULT 0;

-- 2. Create waste_logs table for history
CREATE TABLE IF NOT EXISTS public.waste_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(uid) NOT NULL,
    category TEXT NOT NULL,
    weight_kg DECIMAL(10,2) NOT NULL,
    points_earned INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create reports table for issue reporting
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(uid) NOT NULL,
    issue_type TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    photo_url TEXT,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Set up Row Level Security (RLS) for the new tables
ALTER TABLE public.waste_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own waste logs, admins to see all
CREATE POLICY "Users can insert their own waste logs" ON public.waste_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own waste logs" ON public.waste_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all waste logs" ON public.waste_logs FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE uid = auth.uid() AND role = 'admin'));

-- Allow users to create reports, everyone to view
CREATE POLICY "Users can insert reports" ON public.reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Anyone can view reports" ON public.reports FOR SELECT USING (true);
CREATE POLICY "Admins can update reports" ON public.reports FOR UPDATE USING (EXISTS (SELECT 1 FROM public.users WHERE uid = auth.uid() AND role = 'admin'));
