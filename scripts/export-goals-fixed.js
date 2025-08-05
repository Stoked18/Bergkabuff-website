// scripts/export-goals-fixed.js
// Fixed version mit korrektem Environment Loading

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Manually load .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local')
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local file not found!')
    console.error(`Expected location: ${envPath}`)
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

async function exportGoalsForNotion() {
  try {
    console.log('🔧 Loading environment variables...')
    
    // Load environment variables
    const envVars = loadEnvFile()
    
    console.log('📋 Environment variables loaded:')
    console.log(`   VITE_SUPABASE_URL: ${envVars.VITE_SUPABASE_URL ? '✅ Found' : '❌ Missing'}`)
    console.log(`   VITE_SUPABASE_ANON_KEY: ${envVars.VITE_SUPABASE_ANON_KEY ? '✅ Found' : '❌ Missing'}`)
    console.log(`   NOTION_TOKEN: ${envVars.NOTION_TOKEN ? '✅ Found' : '❌ Missing'}`)
    console.log(`   NOTION_DATABASE_ID: ${envVars.NOTION_DATABASE_ID ? '✅ Found' : '❌ Missing'}`)
    
    const supabaseUrl = envVars.VITE_SUPABASE_URL
    const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Supabase credentials missing in .env.local!')
      console.error('Required variables:')
      console.error('   VITE_SUPABASE_URL=https://your-project.supabase.co')
      console.error('   VITE_SUPABASE_ANON_KEY=your-anon-key')
      process.exit(1)
    }
    
    console.log('📤 Connecting to Supabase...')
    console.log(`🔗 URL: ${supabaseUrl}`)
    
    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Test connection
    console.log('🔍 Testing connection...')
    const { count, error: testError } = await supabase
      .from('goals')
      .select('*', { count: 'exact', head: true })
    
    if (testError) {
      console.error('❌ Supabase connection failed:', testError.message)
      console.error('Full error:', testError)
      process.exit(1)
    }
    
    console.log(`✅ Connection successful! Found ${count} goals.`)
    
    // Load all goals
    console.log('📊 Loading all goals with enhanced schema...')
    const { data: goals, error } = await supabase
      .from('goals')
      .select(`
        id,
        title,
        description,
        status,
        priority,
        category,
        progress,
        deadline,
        created_at,
        updated_at,
        estimated_duration_days,
        actual_start_date,
        completion_date,
        difficulty_level,
        is_public,
        notion_page_id,
        youtube_video_id,
        tags,
        resources,
        reflection,
        view_count,
        like_count,
        share_count
      `)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('❌ Error loading goals:', error.message)
      console.error('Full error:', error)
      process.exit(1)
    }
    
    if (!goals || goals.length === 0) {
      console.error('❌ No goals found in database!')
      process.exit(1)
    }
    
    console.log(`✅ Successfully loaded ${goals.length} goals`)
    
    // Filter only public goals for export
    const publicGoals = goals.filter(goal => goal.is_public !== false)
    console.log(`📋 Exporting ${publicGoals.length} public goals`)
    
    // Analyze data
    const categories = [...new Set(publicGoals.map(g => g.category).filter(Boolean))]
    console.log(`📁 Found ${categories.length} categories:`)
    categories.forEach(cat => console.log(`   - ${cat}`))
    
    // Prepare CSV data
    console.log('📝 Generating CSV for Notion import...')
    
    const csvHeaders = [
      'Title',
      'Description',
      'Status',
      'Priority', 
      'Category',
      'Progress',
      'Website ID',
      'Deadline',
      'Public',
      'Tags',
      'Resources',
      'Reflection',
      'Difficulty'
    ]
    
    // CSV escape function
    const escapeCSV = (value) => {
      if (value === null || value === undefined) return ''
      const str = String(value)
      // Escape quotes and wrap in quotes if contains comma, quote, or newline
      if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return str
    }
    
    // Generate CSV rows
    const csvRows = publicGoals.map((goal, index) => {
      const row = [
        escapeCSV(goal.title || ''),
        escapeCSV(goal.description || ''),
        escapeCSV(goal.status || 'planned'),
        escapeCSV(goal.priority || 'medium'),
        escapeCSV(goal.category || ''),
        goal.progress || 0,
        escapeCSV(goal.id),
        escapeCSV(goal.deadline || ''),
        goal.is_public !== false ? 'true' : 'false',
        escapeCSV((goal.tags || []).join(', ')),
        escapeCSV((goal.resources && goal.resources.links && goal.resources.links[0]) ? goal.resources.links[0].url : ''),
        escapeCSV(goal.reflection || ''),
        goal.difficulty_level || ''
      ].join(',')
      
      // Log progress for large datasets
      if ((index + 1) % 10 === 0) {
        console.log(`   📝 Processed ${index + 1}/${publicGoals.length} goals...`)
      }
      
      return row
    })
    
    // Create final CSV content
    const csvContent = [csvHeaders.join(','), ...csvRows].join('\n')
    
    // Write files
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const csvFileName = `bergkabuff-goals-for-notion-${timestamp.split('T')[0]}.csv`
    const jsonFileName = `bergkabuff-goals-backup-${timestamp.split('T')[0]}.json`
    
    console.log('💾 Writing files...')
    
    // Write CSV
    fs.writeFileSync(csvFileName, csvContent, 'utf8')
    
    // Write JSON backup
    const jsonData = {
      exported_at: new Date().toISOString(),
      source: 'Supabase Database',
      supabase_url: supabaseUrl,
      total_goals: publicGoals.length,
      categories: categories,
      goals: publicGoals
    }
    fs.writeFileSync(jsonFileName, JSON.stringify(jsonData, null, 2), 'utf8')
    
    // Success report
    console.log(`\n🎉 Export completed successfully!`)
    console.log(`📄 Files created:`)
    console.log(`   📊 ${csvFileName} (${publicGoals.length} goals for Notion import)`)
    console.log(`   💾 ${jsonFileName} (Complete backup)`)
    
    // Detailed statistics
    const stats = {
      total: publicGoals.length,
      completed: publicGoals.filter(g => g.status === 'completed').length,
      in_progress: publicGoals.filter(g => g.status === 'in_progress').length,
      planned: publicGoals.filter(g => g.status === 'planned').length,
      paused: publicGoals.filter(g => g.status === 'paused').length,
      with_description: publicGoals.filter(g => g.description && g.description.trim().length > 0).length,
      with_tags: publicGoals.filter(g => g.tags && g.tags.length > 0).length,
      with_deadline: publicGoals.filter(g => g.deadline).length,
      with_reflection: publicGoals.filter(g => g.reflection && g.reflection.trim().length > 0).length
    }
    
    console.log(`\n📊 Export Statistics:`)
    console.log(`   🎯 Total Public Goals: ${stats.total}`)
    console.log(`   ✅ Completed: ${stats.completed}`)
    console.log(`   🔄 In Progress: ${stats.in_progress}`)
    console.log(`   📋 Planned: ${stats.planned}`)
    console.log(`   ⏸️ Paused: ${stats.paused}`)
    console.log(`   📝 With Description: ${stats.with_description}`)
    console.log(`   🏷️ With Tags: ${stats.with_tags}`)
    console.log(`   📅 With Deadline: ${stats.with_deadline}`)
    console.log(`   💭 With Reflection: ${stats.with_reflection}`)
    
    console.log(`\n🗂️ Categories (${categories.length} total):`)
    categories.forEach(cat => {
      const count = publicGoals.filter(g => g.category === cat).length
      console.log(`   - ${cat}: ${count} goals`)
    })
    
    console.log(`\n📋 Next Steps:`)
    console.log(`   1. Open your Notion Goals Database`)
    console.log(`   2. Click the "..." menu → "Import"`)
    console.log(`   3. Select "${csvFileName}"`)
    console.log(`   4. Map the columns (should auto-match)`)
    console.log(`   5. Click "Import" to add all ${publicGoals.length} goals`)
    console.log(`   6. Verify the import in Notion`)
    console.log(`   7. Update .env.local with NOTION_TOKEN and test sync`)
    
    // Show sample data
    console.log(`\n📄 CSV Preview (first row):`)
    const sampleRow = csvRows[0]
    if (sampleRow) {
      const fields = sampleRow.split(',')
      csvHeaders.forEach((header, index) => {
        const value = fields[index] || ''
        const displayValue = value.length > 50 ? value.substring(0, 47) + '...' : value
        console.log(`   ${header}: ${displayValue}`)
      })
    }
    
  } catch (error) {
    console.error('❌ Export failed with error:', error.message)
    console.error('Stack trace:', error.stack)
    process.exit(1)
  }
}

// Execute the export
exportGoalsForNotion()