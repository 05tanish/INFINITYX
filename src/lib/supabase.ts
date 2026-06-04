import { createClient } from '@supabase/supabase-js';

// These should be in your .env file
// VITE_SUPABASE_URL=your-supabase-url
// VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
