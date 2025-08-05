// debug-env.js - Separate script to check environment variables
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const envPath = join(__dirname, '.env.local');
console.log('🔍 Debug Environment Variables');
console.log('📁 Loading from:', envPath);
console.log('📁 __dirname:', __dirname);

dotenv.config({ path: envPath });

console.log('\n📋 Raw Environment Variables:');
console.log('VITE_SUPABASE_URL:', JSON.stringify(process.env.VITE_SUPABASE_URL));
console.log('VITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? '[PRESENT - Length: ' + process.env.VITE_SUPABASE_ANON_KEY.length + ']' : '[MISSING]');
console.log('NOTION_TOKEN:', process.env.NOTION_TOKEN ? '[PRESENT - Starts with: ' + process.env.NOTION_TOKEN.substring(0, 10) + '...]' : '[MISSING]');
console.log('NOTION_DATABASE_ID:', JSON.stringify(process.env.NOTION_DATABASE_ID));

console.log('\n🔍 Detailed Analysis:');

if (process.env.NOTION_DATABASE_ID) {
  const raw = process.env.NOTION_DATABASE_ID;
  console.log('Raw value:', raw);
  console.log('Type:', typeof raw);
  console.log('Includes quotes:', raw.includes('"'));
  
  const cleaned = raw.replace(/['"]/g, '').trim();
  console.log('\n🧹 Cleaned Database ID:', cleaned);
  console.log('📏 Length:', cleaned.length);
  console.log('🔍 Contains hyphens:', cleaned.includes('-'));
  
  // Check if it's a valid UUID format
  const uuidRegex = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
  const isValidUUID = uuidRegex.test(cleaned);
  console.log('🔍 UUID Format Check:', isValidUUID);
  
  if (!isValidUUID && cleaned.length === 32) {
    // Try to format as UUID
    const formatted = cleaned.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
    console.log('🔧 Formatted UUID:', formatted);
    console.log('🔍 Formatted UUID valid:', uuidRegex.test(formatted));
  }
} else {
  console.log('❌ NOTION_DATABASE_ID is completely missing from environment');
}

if (process.env.NOTION_TOKEN) {
  const token = process.env.NOTION_TOKEN;
  console.log('\n🔑 Notion Token Analysis:');
  console.log('Starts with ntn_:', token.startsWith('ntn_'));
  console.log('Starts with secret_:', token.startsWith('secret_'));
  console.log('Length:', token.length);
  
  if (token.startsWith('ntn_')) {
    console.log('✅ Token format looks correct for internal integration');
  } else if (token.startsWith('secret_')) {
    console.log('✅ Token format looks correct for public integration');
  } else {
    console.log('⚠️ Unexpected token format');
  }
}

console.log('\n📋 All Environment Variables (filtered):');
Object.keys(process.env)
  .filter(key => key.includes('NOTION') || key.includes('SUPABASE'))
  .forEach(key => {
    const value = process.env[key];
    if (key.includes('KEY') || key.includes('TOKEN')) {
      console.log(`${key}: [PRESENT - ${value?.length} chars]`);
    } else {
      console.log(`${key}: ${JSON.stringify(value)}`);
    }
  });