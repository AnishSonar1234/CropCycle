import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ntkxswlzchdssqolixpl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50a3hzd2x6Y2hkc3Nxb2xpeHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1ODgyNzQsImV4cCI6MjA1OTE2NDI3NH0.D3FHxEOu5XfZm8jpl5AXPyyKk_0fNOZ2LjJOyxJJ7QM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);