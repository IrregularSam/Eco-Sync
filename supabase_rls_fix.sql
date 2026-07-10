-- 1. Enable RLS on users table (if not already enabled)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 2. Allow users to insert their own profile during signup
CREATE POLICY "Users can insert their own profile" ON public.users 
FOR INSERT 
WITH CHECK (auth.uid() = uid);

-- 3. Allow users to read their own profile
CREATE POLICY "Users can view their own profile" ON public.users 
FOR SELECT 
USING (auth.uid() = uid);

-- 4. Allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON public.users 
FOR UPDATE 
USING (auth.uid() = uid);

-- 5. Allow admins to read all profiles
CREATE POLICY "Admins can view all profiles" ON public.users 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.users WHERE uid = auth.uid() AND role = 'admin'
  )
);
