import { NextResponse } from 'next/server';
import { getRates } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const rates = getRates();
  // Filter out disabled rates for public view
  const activeRates = rates.filter(rate => !rate.isDisabled);
  
  return NextResponse.json(activeRates);
}
