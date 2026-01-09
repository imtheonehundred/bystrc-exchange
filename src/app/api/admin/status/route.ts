import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isSupabaseConfigured = !!supabase;
  const isVercel = process.env.VERCEL === '1';

  return NextResponse.json({
    storage: isSupabaseConfigured ? 'supabase' : 'file',
    isVercel,
    env: {
      url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      key: !!(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    }
  });
}
