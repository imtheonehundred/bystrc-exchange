import fs from 'fs';
import path from 'path';
import { ExchangeRate } from '@/types';
import { supabase } from './supabase';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'currencies.json');
const ADMIN_FILE = path.join(process.cwd(), 'src', 'data', 'admin.json');

// --- Admin Credentials ---

export async function getAdminCredentials() {
  // Try Supabase first
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .single();
      
      if (data && !error) {
        return data;
      }
    } catch (e) {
      console.error('Supabase admin fetch error:', e);
    }
  }

  // Fallback to local file
  try {
    if (!fs.existsSync(ADMIN_FILE)) {
      const defaultCreds = { username: "admin", password: "password123", lastUpdated: new Date().toISOString() };
      await saveAdminCredentials(defaultCreds); // Save default to whatever storage is active
      return defaultCreds;
    }
    const data = fs.readFileSync(ADMIN_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading admin credentials:', error);
    return { username: "admin", password: "password123" };
  }
}

export async function saveAdminCredentials(creds: any): Promise<boolean> {
  // Try Supabase first
  if (supabase) {
    try {
      // Upsert to ID 1 (assuming single admin row)
      const { error } = await supabase
        .from('admin_settings')
        .upsert({ id: 1, ...creds });
      
      if (!error) return true;
      console.error('Supabase admin save error:', error);
    } catch (e) {
      console.error('Supabase admin save exception:', e);
    }
  }

  // Fallback to local file
  try {
    // Ensure directory exists
    const dir = path.dirname(ADMIN_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(ADMIN_FILE, JSON.stringify(creds, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving admin credentials:', error);
    return false;
  }
}

// --- Exchange Rates ---

export async function getRates(): Promise<ExchangeRate[]> {
  // Try Supabase first
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('currencies')
        .select('*')
        .order('currency', { ascending: true });
      
      if (data && !error) {
        return data as ExchangeRate[];
      }
    } catch (e) {
      console.error('Supabase rates fetch error:', e);
    }
  }

  // Fallback to local file
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading rates:', error);
    return [];
  }
}

export async function saveRates(rates: ExchangeRate[]): Promise<boolean> {
  // Try Supabase first
  if (supabase) {
    try {
      const { error } = await supabase
        .from('currencies')
        .upsert(rates);
      
      if (!error) return true;
      console.error('Supabase rates save error:', error);
    } catch (e) {
      console.error('Supabase rates save exception:', e);
    }
  }

  // Fallback to local file
  try {
    // Ensure directory exists
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(rates, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving rates:', error);
    return false;
  }
}

export async function updateRate(currencyCode: string, updates: Partial<ExchangeRate>): Promise<boolean> {
  const rates = await getRates();
  const index = rates.findIndex(r => r.currency === currencyCode);
  
  if (index !== -1) {
    rates[index] = { ...rates[index], ...updates, lastUpdated: new Date().toISOString() };
    return saveRates(rates);
  }
  return false;
}
