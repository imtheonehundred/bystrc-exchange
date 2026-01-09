import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminCredentials } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const creds = getAdminCredentials();
    
    // Check both username and password
    if (username === creds.username && password === creds.password) {
      const cookieStore = await cookies();
      cookieStore.set('admin_session', 'true', { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 // 1 day
      });
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
