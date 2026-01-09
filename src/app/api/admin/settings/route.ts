import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminCredentials, saveAdminCredentials } from '@/lib/db';

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get('admin_session')?.value === 'true';
}

export async function POST(request: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { newUsername, newPassword, currentPassword } = await request.json();
    const creds = await getAdminCredentials();

    // Verify current password before allowing change
    if (creds.password !== currentPassword) {
      return NextResponse.json({ error: 'Current password incorrect' }, { status: 400 });
    }

    // Update credentials
    const newCreds = {
      username: newUsername || creds.username,
      password: newPassword || creds.password,
      lastUpdated: new Date().toISOString()
    };

    if (await saveAdminCredentials(newCreds)) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}