// server/debug-notion.js - Simplified Debug Server
import express from 'express'
import cors from 'cors'
import { Client } from '@notionhq/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// Manual env loading
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local')
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local not found at:', envPath)
    process.exit(1)
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8')
  const envVars = {}
  
  envContent.split('\n').forEach(line => {
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

console.log('🔧 Loading environment...')
const envVars = loadEnvFile()

// Debug output
console.log('\n🔍 ENVIRONMENT DEBUG:')
console.log('Raw env vars:', Object.keys(envVars))
console.log('NOTION_TOKEN exists:', !!envVars.NOTION_TOKEN)
console.log('NOTION_DATABASE_ID exists:', !!envVars.NOTION_DATABASE_ID)
console.log('NOTION_DATABASE_ID value:', `"${envVars.NOTION_DATABASE_ID}"`)
console.log('NOTION_DATABASE_ID type:', typeof envVars.NOTION_DATABASE_ID)
console.log('NOTION_DATABASE_ID length:', envVars.NOTION_DATABASE_ID?.length)

// Test individual components
const notionToken = envVars.NOTION_TOKEN
const notionDatabaseId = envVars.NOTION_DATABASE_ID

console.log('\n🔍 EXTRACTED VALUES:')
console.log('notionToken:', notionToken ? `${notionToken.substring(0, 10)}...` : 'MISSING')
console.log('notionDatabaseId:', `"${notionDatabaseId}"`)
console.log('notionDatabaseId type:', typeof notionDatabaseId)
console.log('notionDatabaseId === undefined:', notionDatabaseId === undefined)
console.log('notionDatabaseId === "undefined":', notionDatabaseId === "undefined")

if (!notionToken || !notionDatabaseId) {
  console.error('❌ Missing credentials!')
  process.exit(1)
}

// Initialize Notion client
console.log('\n🔧 Initializing Notion client...')
const notion = new Client({ auth: notionToken })

// Test endpoint with extensive debugging
app.get('/api/test/notion', async (req, res) => {
  console.log('\n🧪 === NOTION API TEST START ===')
  console.log('Request received at:', new Date().toISOString())
  
  // Debug values at request time
  console.log('🔍 Values at request time:')
  console.log('  notionDatabaseId:', `"${notionDatabaseId}"`)
  console.log('  typeof notionDatabaseId:', typeof notionDatabaseId)
  console.log('  notionDatabaseId.length:', notionDatabaseId?.length)
  console.log('  JSON.stringify(notionDatabaseId):', JSON.stringify(notionDatabaseId))
  
  // Test string operations
  console.log('🔍 String operations:')
  console.log('  notionDatabaseId.trim():', `"${notionDatabaseId.trim()}"`)
  console.log('  notionDatabaseId.replace():', `"${notionDatabaseId.replace(/[^a-f0-9]/g, '')}"`)
  
  try {
    console.log('🚀 Calling notion.databases.retrieve...')
    console.log('  Parameter:', `"${notionDatabaseId}"`)
    
    // Direct API call with the exact value
    const response = await notion.databases.retrieve(notionDatabaseId)
    
    console.log('✅ Success! Database retrieved.')
    
    res.json({
      success: true,
      message: 'Notion API call successful!',
      database: {
        id: response.id,
        title: response.title[0]?.plain_text || 'Untitled',
        properties: Object.keys(response.properties)
      },
      debug: {
        sent_id: notionDatabaseId,
        received_id: response.id,
        ids_match: response.id === notionDatabaseId
      }
    })
    
  } catch (error) {
    console.error('❌ Notion API Error:', error.message)
    console.error('❌ Error details:', {
      name: error.name,
      code: error.code,
      status: error.status
    })
    
    // Try to extract more info from the error
    if (error.body) {
      console.error('❌ Error body:', error.body)
    }
    
    res.status(500).json({
      success: false,
      error: error.message,
      error_details: {
        name: error.name,
        code: error.code,
        status: error.status,
        body: error.body
      },
      debug: {
        sent_id: notionDatabaseId,
        sent_id_type: typeof notionDatabaseId,
        sent_id_length: notionDatabaseId?.length,
        sent_id_json: JSON.stringify(notionDatabaseId)
      }
    })
  }
  
  console.log('🧪 === NOTION API TEST END ===\n')
})

// Health endpoint with full debug info
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    debug: {
      env_vars_loaded: Object.keys(envVars),
      notion_token_exists: !!notionToken,
      notion_database_id_exists: !!notionDatabaseId,
      notion_database_id_value: notionDatabaseId,
      notion_database_id_type: typeof notionDatabaseId,
      notion_database_id_length: notionDatabaseId?.length
    }
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Debug Server running on http://localhost:${PORT}`)
  console.log(`📋 Test: http://localhost:${PORT}/api/test/notion`)
  console.log(`📋 Health: http://localhost:${PORT}/health`)
  console.log('\n✅ Ready for debugging!')
})