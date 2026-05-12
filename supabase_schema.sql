-- Eco-Sync v2.0 Enterprise Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Routes Table (Health Auto-Scaling Engine)
CREATE TABLE public.routes (
    route_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    polyline JSONB, -- Stores GPS coordinates for the route path
    current_capacity INTEGER DEFAULT 0, -- 0 to 100 percentage
    status TEXT DEFAULT 'optimal' CHECK (status IN ('optimal', 'warning', 'critical')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Users Table (Customer Hub)
CREATE TABLE public.users (
    uid UUID PRIMARY KEY REFERENCES auth.users(id),
    full_name TEXT NOT NULL,
    address TEXT NOT NULL,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'staff_lead', 'staff_normal')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'defaulter', 'pending')),
    route_id UUID REFERENCES public.routes(route_id),
    subscription_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Bins Table (Physical Hardware Tracking)
CREATE TABLE public.bins (
    bin_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(uid),
    qr_hash TEXT UNIQUE NOT NULL,
    fill_status TEXT DEFAULT 'empty' CHECK (fill_status IN ('empty', 'half', 'full', 'resolved')),
    last_collected_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Teams Table (HR Fleet Ops)
CREATE TABLE public.teams (
    team_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    lead_id UUID REFERENCES public.users(uid),
    truck_id TEXT NOT NULL,
    current_route UUID REFERENCES public.routes(route_id),
    status TEXT DEFAULT 'idle' CHECK (status IN ('idle', 'dispatched', 'returning')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Shifts Table (Ground Ops Duty Roster)
CREATE TABLE public.shifts (
    shift_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id UUID REFERENCES public.users(uid),
    team_id UUID REFERENCES public.teams(team_id),
    date DATE NOT NULL,
    clock_in_time TIMESTAMP WITH TIME ZONE,
    clock_out_time TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'active', 'completed', 'missed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shifts ENABLE ROW LEVEL SECURITY;

-- Note: Proper RLS policies should be added here based on auth.uid() matching role requirements.
