// server/index.js - Fixed Environment Loading
import express from 'express'
import cors from 'cors'
import { Client } from '@notionhq/client'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Manual .env.local loading (wie im Export Script)
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local')
  
  console.log('🔧 Loading environment from:', envPath)
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local file not found!')
    console.error(`Expected location: ${envPath}`)
    process.exit(1)
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8')
  const envVars = {}
  
  envContent.split('\n').forEach((line, index) => {
    const trimmedLine = line.trim()
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=')
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, '')
        envVars[key.trim()] = value.trim()
        process.env[key.trim()] = value.trim()
      }
    }
  })
  
  return envVars
}

const app = express()
const PORT = 3001

// Load environment variables manually
console.log('🔧 Loading environment variables...')
const envVars = loadEnvFile()

// Debug environment variables
console.log('📋 Environment variables loaded:')
console.log(`   VITE_SUPABASE_URL: ${envVars.VITE_SUPABASE_URL ? '✅ Found' : '❌ Missing'}`)
console.log(`   VITE_SUPABASE_ANON_KEY: ${envVars.VITE_SUPABASE_ANON_KEY ? '✅ Found' : '❌ Missing'}`)
console.log(`   NOTION_TOKEN: ${envVars.NOTION_TOKEN ? '✅ Found' : '❌ Missing'}`)
console.log(`   NOTION_DATABASE_ID: ${envVars.NOTION_DATABASE_ID ? '✅ Found' : '❌ Missing'}`)

if (envVars.NOTION_DATABASE_ID) {
  console.log(`   Database ID: ${envVars.NOTION_DATABASE_ID}`)
} else {
  console.log('   Database ID: ❌ NOT FOUND')
}

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Get credentials from our loaded env vars
const supabaseUrl = envVars.VITE_SUPABASE_URL
const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY
const notionToken = envVars.NOTION_TOKEN
const notionDatabaseId = envVars.NOTION_DATABASE_ID

// Validate credentials
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials missing!')
  console.error('Required in .env.local:')
  console.error('   VITE_SUPABASE_URL=https://your-project.supabase.co')
  console.error('   VITE_SUPABASE_ANON_KEY=your-anon-key')
  process.exit(1)
}

if (!notionToken || !notionDatabaseId) {
  console.error('❌ Notion credentials missing!')
  console.error('Required in .env.local:')
  console.error('   NOTION_TOKEN=secret_your_token')
  console.error('   NOTION_DATABASE_ID=244c9c93435e800ea721d71380e5573d')
  
  if (notionDatabaseId === 'undefined' || notionDatabaseId === undefined) {
    console.error('⚠️ NOTION_DATABASE_ID is literally "undefined" - check your .env.local file!')
  }
  
  process.exit(1)
}

// Validate Database ID format
if (notionDatabaseId.length !== 32 || !/^[a-f0-9]{32}$/.test(notionDatabaseId)) {
  console.error('❌ Invalid NOTION_DATABASE_ID format!')
  console.error(`Expected: 32 character hex string (like: 244c9c93435e800ea721d71380e5573d)`)
  console.error(`Received: ${notionDatabaseId} (length: ${notionDatabaseId.length})`)
  process.exit(1)
}

// Initialize clients
console.log('🔧 Initializing API clients...')

const supabase = createClient(supabaseUrl, supabaseKey)
const notion = new Client({ auth: notionToken })

console.log('✅ API clients initialized')
console.log(`🔗 Supabase: ${supabaseUrl}`)
console.log(`📋 Notion Database: ${notionDatabaseId}`)

// Notion Sync Service (same as before, but with better error handling)
class NotionSyncService {
  async syncFromNotion() {
    console.log('🔄 Starting Notion → Supabase sync...')
    console.log(`📋 Using Database ID: ${notionDatabaseId}`)
    
    const result = {
      synced: 0,
      created: 0,
      updated: 0,
      errors: []
    }

    try {
      // Validate database access first
      console.log('🔍 Validating Notion database access...')
      await notion.databases.retrieve(notionDatabaseId)
      console.log('✅ Database access confirmed')
      
      // Query all pages from Notion database
      console.log('📖 Fetching goals from Notion...')
      
      const response = await notion.databases.query({
        database_id: notionDatabaseId,
        sorts: [
          {
            property: 'Created',
            direction: 'descending'
          }
        ]
      })

      console.log(`📋 Found ${response.results.length} goals in Notion`)

      // Process each Notion page
      for (const page of response.results) {
        try {
          const goalData = this.transformNotionPageToGoal(page)
          const websiteId = this.getWebsiteIdFromNotion(page)
          
          console.log(`🔄 Processing: ${goalData.title} (Website ID: ${websiteId || 'none'})`)
          
          if (websiteId) {
            // Update existing goal in Supabase
            await this.updateGoalInSupabase(websiteId, goalData, page.id)
            result.updated++
            console.log(`✅ Updated: ${goalData.title}`)
          } else {
            // Create new goal in Supabase
            const newGoal = await this.createGoalInSupabase(goalData, page.id)
            if (newGoal) {
              // Update Notion with the new Website ID
              await this.updateNotionWithWebsiteId(page.id, newGoal.id)
              result.created++
              console.log(`🆕 Created: ${goalData.title}`)
            }
          }
          
          result.synced++
          
        } catch (error) {
          console.error(`❌ Error processing goal: ${page.id}`, error.message)
          result.errors.push({
            pageId: page.id,
            error: error.message
          })
        }
      }

      console.log('✅ Notion sync completed successfully!')
      console.log(`📊 Results: ${result.synced} synced, ${result.created} created, ${result.updated} updated`)
      return result
      
    } catch (error) {
      console.error('❌ Notion sync failed:', error.message)
      throw error
    }
  }

  transformNotionPageToGoal(notionPage) {
    const props = notionPage.properties
    
    return {
      title: this.getTextFromNotion(props.Title) || 'Untitled Goal',
      description: this.getTextFromNotion(props.Description) || null,
      status: this.getSelectFromNotion(props.Status) || 'planned',
      priority: this.getSelectFromNotion(props.Priority) || 'medium',
      category: this.getSelectFromNotion(props.Category) || 'Allgemein',
      progress: this.getNumberFromNotion(props.Progress) || 0,
      deadline: this.getDateFromNotion(props.Deadline) || null,
      difficulty_level: this.getNumberFromNotion(props.Difficulty) || null,
      is_public: this.getCheckboxFromNotion(props.Public) !== false,
      tags: this.getMultiSelectFromNotion(props.Tags) || [],
      resources: {
        links: this.getTextFromNotion(props.Resources) ? 
          [{ title: 'Resource', url: this.getTextFromNotion(props.Resources) }] : 
          []
      },
      reflection: this.getTextFromNotion(props.Reflection) || null,
      notion_page_id: notionPage.id,
      updated_at: new Date().toISOString()
    }
  }

  getWebsiteIdFromNotion(notionPage) {
    const websiteId = this.getNumberFromNotion(notionPage.properties['Website ID'])
    return websiteId ? String(websiteId) : null
  }

  async updateGoalInSupabase(goalId, goalData, notionPageId) {
    const { data, error } = await supabase
      .from('goals')
      .update({
        ...goalData,
        notion_page_id: notionPageId
      })
      .eq('id', goalId)
      .select()
      .single()
    
    if (error) {
      throw new Error(`Supabase update failed: ${error.message}`)
    }
    
    return data
  }

  async createGoalInSupabase(goalData, notionPageId) {
    const { data, error } = await supabase
      .from('goals')
      .insert([{
        ...goalData,
        notion_page_id: notionPageId
      }])
      .select()
      .single()
    
    if (error) {
      throw new Error(`Supabase insert failed: ${error.message}`)
    }
    
    return data
  }

  async updateNotionWithWebsiteId(pageId, websiteId) {
    try {
      // For UUID, extract numeric part or use hash
      const numericId = parseInt(websiteId.replace(/\D/g, '').substring(0, 10)) || Math.abs(websiteId.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0)
        return a & a
      }, 0))
      
      await notion.pages.update({
        page_id: pageId,
        properties: {
          'Website ID': {
            number: numericId
          }
        }
      })
      
      console.log(`✅ Updated Notion with Website ID: ${numericId}`)
    } catch (error) {
      console.warn('⚠️ Could not update Notion with Website ID:', error.message)
    }
  }

  // Helper functions remain the same
  getTextFromNotion(property) {
    if (!property) return null
    
    if (property.title && property.title.length > 0) {
      return property.title[0].plain_text
    }
    
    if (property.rich_text && property.rich_text.length > 0) {
      return property.rich_text[0].plain_text
    }
    
    return null
  }

  getSelectFromNotion(property) {
    if (!property || !property.select) return null
    return property.select.name?.toLowerCase()
  }

  getMultiSelectFromNotion(property) {
    if (!property || !property.multi_select) return []
    return property.multi_select.map(item => item.name)
  }

  getNumberFromNotion(property) {
    if (!property) return null
    return property.number
  }

  getDateFromNotion(property) {
    if (!property || !property.date) return null
    return property.date.start
  }

  getCheckboxFromNotion(property) {
    if (!property) return false
    return property.checkbox
  }
}

// Initialize sync service
const syncService = new NotionSyncService()

// API Routes
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    services: {
      supabase: !!supabaseUrl,
      notion: !!notionToken,
      database_id: !!notionDatabaseId
    },
    config: {
      database_id: notionDatabaseId,
      database_id_length: notionDatabaseId?.length
    }
  })
})

app.post('/api/sync/notion', async (req, res) => {
  try {
    console.log('🚀 Received sync request from client')
    
    const result = await syncService.syncFromNotion()
    
    res.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('❌ Sync API error:', error.message)
    
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

// Test Notion connection with better error handling
app.get('/api/test/notion', async (req, res) => {
  try {
    console.log('🧪 Testing Notion connection...')
    console.log(`📋 Database ID: ${notionDatabaseId}`)
    
    const response = await notion.databases.retrieve(notionDatabaseId)
    
    console.log('✅ Notion connection successful!')
    
    res.json({
      success: true,
      database: {
        id: response.id,
        title: response.title[0]?.plain_text || 'Untitled',
        properties: Object.keys(response.properties),
        property_count: Object.keys(response.properties).length
      },
      config: {
        database_id: notionDatabaseId,
        token_prefix: notionToken?.substring(0, 10) + '...'
      }
    })
  } catch (error) {
    console.error('❌ Notion connection failed:', error.message)
    
    res.status(500).json({
      success: false,
      error: error.message,
      config: {
        database_id: notionDatabaseId,
        database_id_type: typeof notionDatabaseId,
        database_id_length: notionDatabaseId?.length
      }
    })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Bergkabuff API Server running on http://localhost:${PORT}`)
  console.log(`📋 Endpoints:`)
  console.log(`   GET  /health              - Server status`)
  console.log(`   POST /api/sync/notion     - Sync from Notion`)
  console.log(`   GET  /api/test/notion     - Test Notion connection`)
  console.log(`\n✅ Ready for sync requests!`)
  console.log(`\n🔧 Configuration:`)
  console.log(`   Supabase URL: ${supabaseUrl}`)
  console.log(`   Notion Database: ${notionDatabaseId}`)
})