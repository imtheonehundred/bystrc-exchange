import { NextResponse } from 'next/server';
import { getRates } from '@/lib/db';

export async function GET() {
  const rates = getRates();
  // Filter out disabled rates for public view
  const activeRates = rates.filter(rate => !rate.isDisabled);
  
  return NextResponse.json(activeRates);
}
