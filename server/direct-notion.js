// server/direct-notion.js - Direkte Notion API ohne Client Library
import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// Load environment
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local')
  const envContent = fs.readFileSync(envPath, 'utf8')
  const envVars = {}
  
  envContent.split('\n').forEach(line => {
    const trimmedLine = line.trim()
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=')
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, '')
        envVars[key.trim()] = value.trim()
      }
    }
  })
  
  return envVars
}

const envVars = loadEnvFile()
const notionToken = envVars.NOTION_TOKEN
const notionDatabaseId = envVars.NOTION_DATABASE_ID

console.log('🔧 Direct Notion API Setup:')
console.log('Token:', notionToken ? `${notionToken.substring(0, 15)}...` : 'MISSING')
console.log('DB ID:', notionDatabaseId)

// Direct Notion API class
class DirectNotionAPI {
  constructor(token) {
    this.token = token
    this.baseUrl = 'https://api.notion.com/v1'
    this.headers = {
      'Authorization': `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    }
  }

  async getDatabase(databaseId) {
    console.log(`🔍 Direct API call to: ${this.baseUrl}/databases/${databaseId}`)
    console.log('Headers:', this.headers)
    
    const response = await fetch(`${this.baseUrl}/databases/${databaseId}`, {
      method: 'GET',
      headers: this.headers
    })
    
    const responseText = await response.text()
    console.log('Response status:', response.status)
    console.log('Response text:', responseText.substring(0, 200) + '...')
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${responseText}`)
    }
    
    return JSON.parse(responseText)
  }

  async queryDatabase(databaseId, options = {}) {
    console.log(`🔍 Querying database: ${databaseId}`)
    
    const response = await fetch(`${this.baseUrl}/databases/${databaseId}/query`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(options)
    })
    
    const responseText = await response.text()
    console.log('Query response status:', response.status)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${responseText}`)
    }
    
    return JSON.parse(responseText)
  }
}

const notionAPI = new DirectNotionAPI(notionToken)

// Test endpoint using direct API
app.get('/api/test/notion', async (req, res) => {
  try {
    console.log('\n🧪 === DIRECT API TEST START ===')
    console.log('Database ID to test:', notionDatabaseId)
    
    const database = await notionAPI.getDatabase(notionDatabaseId)
    
    console.log('✅ Direct API Success!')
    console.log('Database title:', database.title[0]?.plain_text)
    
    res.json({
      success: true,
      message: 'Direct Notion API works!',
      database: {
        id: database.id,
        title: database.title[0]?.plain_text || 'Untitled',
        properties: Object.keys(database.properties),
        property_count: Object.keys(database.properties).length
      }
    })
    
  } catch (error) {
    console.error('❌ Direct API Error:', error.message)
    
    res.status(500).json({
      success: false,
      error: error.message,
      debug: {
        database_id: notionDatabaseId,
        token_prefix: notionToken?.substring(0, 15) + '...'
      }
    })
  }
})

// Full sync using direct API
app.post('/api/sync/notion', async (req, res) => {
  try {
    console.log('\n🔄 === DIRECT SYNC START ===')
    
    // Query all pages from database
    const queryResult = await notionAPI.queryDatabase(notionDatabaseId, {
      sorts: [{ property: 'Created', direction: 'descending' }]
    })
    
    console.log(`📋 Found ${queryResult.results.length} pages in Notion`)
    
    // Process each page (simplified for now)
    const processedGoals = queryResult.results.map((page, index) => {
      const props = page.properties
      
      return {
        notion_id: page.id,
        title: props.Title?.title[0]?.plain_text || `Goal ${index + 1}`,
        description: props.Description?.rich_text[0]?.plain_text || null,
        status: props.Status?.select?.name?.toLowerCase() || 'planned',
        priority: props.Priority?.select?.name?.toLowerCase() || 'medium',
        category: props.Category?.select?.name || 'Allgemein',
        progress: props.Progress?.number || 0,
        website_id: props['Website ID']?.number || null
      }
    })
    
    console.log('✅ Processed all goals successfully')
    console.log('Sample goal:', processedGoals[0])
    
    res.json({
      success: true,
      synced: processedGoals.length,
      created: 0,
      updated: processedGoals.length,
      goals: processedGoals.slice(0, 5), // Show first 5 as sample
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('❌ Direct sync error:', error.message)
    
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy - direct API',
    database_id: notionDatabaseId,
    token_exists: !!notionToken
  })
})

app.listen(PORT, () => {
  console.log(`\n🚀 Direct Notion API Server running on http://localhost:${PORT}`)
  console.log(`📋 Test: http://localhost:${PORT}/api/test/notion`)
  console.log(`🔄 Sync: POST http://localhost:${PORT}/api/sync/notion`)
  console.log('\n✅ Using direct HTTP API calls instead of @notionhq/client')
})