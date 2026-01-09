import fs from 'fs';
import path from 'path';
import { ExchangeRate } from '@/types';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'currencies.json');
const ADMIN_FILE = path.join(process.cwd(), 'src', 'data', 'admin.json');

export function getAdminCredentials() {
  try {
    if (!fs.existsSync(ADMIN_FILE)) {
      // Default credentials if file doesn't exist
      const defaultCreds = { username: "admin", password: "password123", lastUpdated: new Date().toISOString() };
      saveAdminCredentials(defaultCreds);
      return defaultCreds;
    }
    const data = fs.readFileSync(ADMIN_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading admin credentials:', error);
    return { username: "admin", password: "password123" };
  }
}

export function saveAdminCredentials(creds: any): boolean {
  try {
    fs.writeFileSync(ADMIN_FILE, JSON.stringify(creds, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving admin credentials:', error);
    return false;
  }
}

export function getRates(): ExchangeRate[] {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading rates:', error);
    return [];
  }
}

export function saveRates(rates: ExchangeRate[]): boolean {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(rates, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving rates:', error);
    return false;
  }
}

export function updateRate(currencyCode: string, updates: Partial<ExchangeRate>): boolean {
  const rates = getRates();
  const index = rates.findIndex(r => r.currency === currencyCode);
  
  if (index !== -1) {
    rates[index] = { ...rates[index], ...updates, lastUpdated: new Date().toISOString() };
    return saveRates(rates);
  }
  return false;
}
