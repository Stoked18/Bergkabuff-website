import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createClient } from '@supabase/supabase-js';
import { Client } from '@notionhq/client';

// ES Module __dirname alternative
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const envPath = join(__dirname, '..', '.env.local');
console.log('🔧 Loading environment variables...');
console.log('🔧 Loading environment from:', envPath);

dotenv.config({ path: envPath });

// Debug environment variables
console.log('📋 Environment variables loaded:');
console.log('   VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL ? '✅ Found' : '❌ Missing');
console.log('   VITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? '✅ Found' : '❌ Missing');
console.log('   NOTION_TOKEN:', process.env.NOTION_TOKEN ? '✅ Found' : '❌ Missing');
console.log('   NOTION_DATABASE_ID:', process.env.NOTION_DATABASE_ID ? '✅ Found' : '❌ Missing');

// Validate required environment variables
const requiredEnvVars = {
  VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY,
  NOTION_TOKEN: process.env.NOTION_TOKEN,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID
};

const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars);
  process.exit(1);
}

// Clean and validate Notion Database ID
let notionDatabaseId = process.env.NOTION_DATABASE_ID;

console.log('🔍 Raw NOTION_DATABASE_ID:', JSON.stringify(notionDatabaseId));
console.log('🔍 Type:', typeof notionDatabaseId);

if (!notionDatabaseId || notionDatabaseId === 'undefined') {
  console.error('❌ NOTION_DATABASE_ID is missing or undefined');
  console.log('💡 Check your .env.local file and make sure NOTION_DATABASE_ID is set');
  process.exit(1);
}

// Clean the database ID
notionDatabaseId = notionDatabaseId.replace(/['"]/g, '').trim();
console.log('🧹 Cleaned Database ID:', notionDatabaseId);

// Format UUID if it's missing hyphens
if (notionDatabaseId.length === 32 && !notionDatabaseId.includes('-')) {
  notionDatabaseId = notionDatabaseId.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
  console.log('🔧 Formatted as UUID:', notionDatabaseId);
}

// Validate UUID format
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
if (!uuidRegex.test(notionDatabaseId)) {
  console.error('❌ Invalid Notion Database ID format. Expected UUID, got:', notionDatabaseId);
  console.log('💡 Make sure your NOTION_DATABASE_ID is a valid UUID');
  console.log('💡 Example: 244c9c93-435e-80bf-bb5a-d3379ec3f17b');
  process.exit(1);
}

// Validate Notion Token
const notionToken = process.env.NOTION_TOKEN;
console.log('🔑 Notion Token validation:');
console.log('   Token present:', !!notionToken);

if (notionToken) {
  console.log('   Token length:', notionToken.length);
  console.log('   Starts with ntn_:', notionToken.startsWith('ntn_'));
  console.log('   Starts with secret_:', notionToken.startsWith('secret_'));
  
  if (!notionToken.startsWith('ntn_') && !notionToken.startsWith('secret_')) {
    console.warn('⚠️ Unexpected token format. Expected to start with "ntn_" or "secret_"');
  }
} else {
  console.error('❌ NOTION_TOKEN is missing');
  process.exit(1);
}

// Initialize Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Initialize Notion
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

console.log('✅ API clients initialized');
console.log('🔗 Supabase:', process.env.VITE_SUPABASE_URL);
console.log('📋 Notion Database:', notionDatabaseId);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    supabase: !!process.env.VITE_SUPABASE_URL,
    notion: !!process.env.NOTION_TOKEN
  });
});

// Test Notion connection
app.get('/api/test/notion', async (req, res) => {
  try {
    console.log('🧪 Testing Notion connection...');
    console.log('📋 Database ID:', notionDatabaseId);
    console.log('🔑 Token type:', process.env.NOTION_TOKEN?.substring(0, 10) + '...');
    
    // First test: Get user info (works with internal integrations)
    console.log('🔍 Step 1: Testing Notion API access...');
    const userResponse = await notion.users.me();
    console.log('✅ Notion API access successful');
    console.log('👤 Bot user:', userResponse.name || 'Unnamed bot');
    
    // Second test: Try to retrieve the database
    console.log('🔍 Step 2: Testing database access...');
    const response = await notion.databases.retrieve({
      database_id: notionDatabaseId
    });
    
    console.log('✅ Notion database connection successful');
    console.log('📋 Database title:', response.title?.[0]?.plain_text || 'Untitled');
    console.log('📊 Properties:', Object.keys(response.properties).join(', '));
    
    res.json({
      success: true,
      botUser: {
        name: userResponse.name,
        type: userResponse.type
      },
      database: {
        id: response.id,
        title: response.title?.[0]?.plain_text || 'Untitled',
        properties: Object.keys(response.properties),
        propertyCount: Object.keys(response.properties).length
      }
    });
    
  } catch (error) {
    console.error('❌ Notion connection failed:', error.message);
    console.error('🔍 Error details:', {
      code: error.code,
      status: error.status,
      message: error.message
    });
    
    // Provide helpful error messages
    let helpMessage = '';
    if (error.code === 'unauthorized') {
      helpMessage = 'Check your NOTION_TOKEN and make sure the integration has access to the database.';
    } else if (error.code === 'object_not_found') {
      helpMessage = 'Database not found. Check your NOTION_DATABASE_ID.';
    } else if (error.code === 'validation_error') {
      helpMessage = 'Invalid database ID format. Make sure it\'s a valid UUID.';
    }
    
    res.status(500).json({
      success: false,
      error: error.message,
      code: error.code,
      databaseId: notionDatabaseId,
      tokenType: process.env.NOTION_TOKEN?.substring(0, 10) + '...',
      helpMessage
    });
  }
});

// Sync from Notion to Supabase
app.post('/api/sync/notion', async (req, res) => {
  try {
    console.log('🔄 Starting Notion sync...');
    
    // Query Notion database
    const notionResponse = await notion.databases.query({
      database_id: notionDatabaseId,
      sorts: [
        {
          property: 'Created',
          direction: 'descending'
        }
      ]
    });
    
    console.log(`📄 Found ${notionResponse.results.length} pages in Notion`);
    
    if (notionResponse.results.length === 0) {
      return res.json({
        success: true,
        message: 'No pages found in Notion database',
        synced: 0
      });
    }
    
    // Transform Notion pages to goal objects
    const goals = notionResponse.results.map(page => {
      try {
        const properties = page.properties;
        
        return {
          // Required fields - angepasst an deine Notion Properties
          title: properties.Title?.title?.[0]?.plain_text || 'Untitled Goal',
          
          description: properties.Description?.rich_text?.[0]?.plain_text || '',
          
          status: (properties.Status?.select?.name || 'planned').toLowerCase()
            .replace('abgeschlossen', 'completed')
            .replace('in arbeit', 'in_progress')
            .replace('in progress', 'in_progress')
            .replace('geplant', 'planned')
            .replace('pausiert', 'paused'),
          
          priority: (properties.Priority?.select?.name || 'medium').toLowerCase()
            .replace('hoch', 'high')
            .replace('mittel', 'medium')
            .replace('niedrig', 'low'),
          
          category: properties.Category?.select?.name || 'Allgemein',
          
          progress: Math.max(0, Math.min(100, 
            properties.Progress?.number || 0
          )),
          
          // Optional fields angepasst an deine Properties
          deadline: properties.Deadline?.date?.start || null,
          
          // Enhanced fields aus deiner Notion-Struktur
          difficulty_level: properties.Difficulty?.number || null,
          is_public: properties.Public?.checkbox !== false, // Default true
          
          tags: properties.Tags?.multi_select?.map(tag => tag.name) || [],
          
          resources: properties.Resources?.rich_text?.[0]?.plain_text ? 
            { links: [{ title: 'Resource', url: properties.Resources.rich_text[0].plain_text }] } : 
            null,
          
          reflection: properties.Reflection?.rich_text?.[0]?.plain_text || null,
          
          // Metadata
          notion_page_id: page.id,
          created_at: properties.Created?.created_time || page.created_time,
          updated_at: properties['Last Edited']?.last_edited_time || page.last_edited_time
        };
      } catch (error) {
        console.error('❌ Error transforming page:', page.id, error.message);
        return null;
      }
    }).filter(goal => goal !== null);
    
    console.log(`✅ Transformed ${goals.length} valid goals`);
    
    // Sync to Supabase
    let syncedCount = 0;
    let errorCount = 0;
    
    for (const goal of goals) {
      try {
        // Check if goal already exists
        const { data: existingGoals, error: selectError } = await supabase
          .from('goals')
          .select('id, notion_page_id')
          .eq('notion_page_id', goal.notion_page_id);
        
        if (selectError) {
          console.error('❌ Error checking existing goal:', selectError.message);
          errorCount++;
          continue;
        }
        
        if (existingGoals && existingGoals.length > 0) {
          // Update existing goal
          const { error: updateError } = await supabase
            .from('goals')
            .update({
              title: goal.title,
              description: goal.description,
              status: goal.status,
              priority: goal.priority,
              category: goal.category,
              progress: goal.progress,
              deadline: goal.deadline,
              updated_at: new Date().toISOString()
            })
            .eq('notion_page_id', goal.notion_page_id);
          
          if (updateError) {
            console.error('❌ Error updating goal:', updateError.message);
            errorCount++;
          } else {
            syncedCount++;
            console.log(`📝 Updated: ${goal.title}`);
          }
        } else {
          // Insert new goal
          const { error: insertError } = await supabase
            .from('goals')
            .insert([goal]);
          
          if (insertError) {
            console.error('❌ Error inserting goal:', insertError.message);
            errorCount++;
          } else {
            syncedCount++;
            console.log(`➕ Created: ${goal.title}`);
          }
        }
      } catch (error) {
        console.error('❌ Error syncing goal:', goal.title, error.message);
        errorCount++;
      }
    }
    
    console.log(`✅ Sync completed: ${syncedCount} synced, ${errorCount} errors`);
    
    res.json({
      success: true,
      message: `Successfully synced ${syncedCount} goals from Notion`,
      synced: syncedCount,
      errors: errorCount,
      total: goals.length
    });
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      code: error.code
    });
  }
});

// Get all goals from Supabase
app.get('/api/goals', async (req, res) => {
  try {
    const { data: goals, error } = await supabase
      .from('goals')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    res.json({
      success: true,
      goals: goals || [],
      count: goals?.length || 0
    });
  } catch (error) {
    console.error('❌ Error fetching goals:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: error.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Bergkabuff API Server running on http://localhost:${PORT}`);
  console.log('📋 Endpoints:');
  console.log('   GET  /health              - Server status');
  console.log('   POST /api/sync/notion     - Sync from Notion');
  console.log('   GET  /api/test/notion     - Test Notion connection');
  console.log('   GET  /api/goals           - Get all goals from Supabase');
  console.log('\n✅ Ready for sync requests!');
  
  console.log('\n🔧 Configuration:');
  console.log('   Supabase URL:', process.env.VITE_SUPABASE_URL);
  console.log('   Notion Database:', notionDatabaseId);
  
  // Auto-test connections on startup
  setTimeout(async () => {
    try {
      console.log('\n🧪 Testing connections on startup...');
      
      // Test Notion
      const response = await fetch(`http://localhost:${PORT}/api/test/notion`);
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Notion connection: OK');
        console.log('📋 Database:', result.database.title);
      } else {
        console.log('❌ Notion connection: FAILED');
        console.log('   Error:', result.error);
      }
    } catch (error) {
      console.log('❌ Startup test failed:', error.message);
    }
  }, 1000);
});