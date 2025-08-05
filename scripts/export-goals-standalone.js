// scripts/export-goals-standalone.js
// Standalone Script ohne Vite Dependencies

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import 'dotenv/config'

// Supabase direkt initialisieren
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase environment variables missing!')
  console.error('Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function exportGoalsForNotion() {
  try {
    console.log('📤 Exporting goals from Supabase for Notion Import...')
    console.log(`🔗 Connecting to: ${supabaseUrl}`)
    
    // Test connection first
    const { data: testData, error: testError } = await supabase
      .from('goals')
      .select('count', { count: 'exact', head: true })
    
    if (testError) {
      console.error('❌ Supabase connection failed:', testError.message)
      process.exit(1)
    }
    
    console.log(`✅ Connection successful. Found ${testData} goals.`)
    
    // Load all goals with enhanced schema
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
      .eq('is_public', true)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('❌ Error loading goals:', error.message)
      process.exit(1)
    }
    
    if (!goals || goals.length === 0) {
      console.error('❌ No goals found!')
      process.exit(1)
    }
    
    console.log(`📊 Successfully loaded ${goals.length} goals`)
    
    // Process and clean the data
    const processedGoals = goals.map(goal => ({
      ...goal,
      // Ensure arrays are properly handled
      tags: Array.isArray(goal.tags) ? goal.tags : [],
      // Ensure resources is an object
      resources: goal.resources && typeof goal.resources === 'object' ? goal.resources : {},
      // Ensure progress is a number
      progress: parseInt(goal.progress) || 0,
      // Format dates
      deadline: goal.deadline ? new Date(goal.deadline).toISOString().split('T')[0] : null,
    }))
    
    // Analyze categories
    const categories = [...new Set(processedGoals.map(g => g.category).filter(Boolean))]
    console.log(`📁 Categories found: ${categories.join(', ')}`)
    
    // Generate CSV content for Notion import
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
    
    // Generate CSV rows
    const csvRows = processedGoals.map(goal => {
      // Helper function to escape CSV values
      const escapeCSV = (value) => {
        if (value === null || value === undefined) return ''
        const str = String(value)
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`
        }
        return str
      }
      
      return [
        escapeCSV(goal.title || ''),
        escapeCSV(goal.description || ''),
        escapeCSV(goal.status || 'planned'),
        escapeCSV(goal.priority || 'medium'),
        escapeCSV(goal.category || 'Allgemein'),
        goal.progress || 0,
        escapeCSV(goal.id),
        escapeCSV(goal.deadline || ''),
        goal.is_public !== false ? 'true' : 'false',
        escapeCSV((goal.tags || []).join(', ')),
        escapeCSV(goal.resources?.links?.[0]?.url || ''),
        escapeCSV(goal.reflection || ''),
        goal.difficulty_level || ''
      ].join(',')
    })
    
    // Create CSV content
    const csvContent = [
      csvHeaders.join(','),
      ...csvRows
    ].join('\n')
    
    // Write CSV file
    const csvFileName = 'bergkabuff-goals-for-notion.csv'
    fs.writeFileSync(csvFileName, csvContent, 'utf8')
    
    // Create JSON backup
    const jsonData = {
      exported_at: new Date().toISOString(),
      total_goals: processedGoals.length,
      categories: categories,
      source: 'Supabase Export',
      goals: processedGoals
    }
    
    const jsonFileName = 'bergkabuff-goals-backup.json'
    fs.writeFileSync(jsonFileName, JSON.stringify(jsonData, null, 2))
    
    // Success report
    console.log(`\n✅ Export completed successfully!`)
    console.log(`📄 Files created:`)
    console.log(`   📊 ${csvFileName} (${processedGoals.length} goals for Notion import)`)
    console.log(`   💾 ${jsonFileName} (JSON backup)`)
    
    // Statistics
    const stats = {
      total: processedGoals.length,
      completed: processedGoals.filter(g => g.status === 'completed').length,
      in_progress: processedGoals.filter(g => g.status === 'in_progress').length,
      planned: processedGoals.filter(g => g.status === 'planned').length,
      with_description: processedGoals.filter(g => g.description && g.description.trim()).length,
      with_tags: processedGoals.filter(g => g.tags && g.tags.length > 0).length
    }
    
    console.log(`\n📊 Export Statistics:`)
    console.log(`   🎯 Total Goals: ${stats.total}`)
    console.log(`   ✅ Completed: ${stats.completed}`)
    console.log(`   🔄 In Progress: ${stats.in_progress}`)
    console.log(`   📋 Planned: ${stats.planned}`)
    console.log(`   📝 With Description: ${stats.with_description}`)
    console.log(`   🏷️ With Tags: ${stats.with_tags}`)
    
    console.log(`\n🎯 Categories in your data:`)
    categories.forEach(cat => console.log(`   - ${cat}`))
    
    console.log(`\n📋 Next Steps:`)
    console.log(`   1. Open your Notion database`)
    console.log(`   2. Click "..." → "Import"`)
    console.log(`   3. Select "${csvFileName}"`)
    console.log(`   4. Map columns and import`)
    console.log(`   5. Verify data in Notion`)
    
    // Sample data preview
    console.log(`\n📄 Sample CSV preview (first 3 lines):`)
    const sampleLines = csvContent.split('\n').slice(0, 3)
    sampleLines.forEach((line, index) => {
      if (index === 0) {
        console.log(`   Header: ${line}`)
      } else {
        console.log(`   Row ${index}: ${line.length > 100 ? line.substring(0, 100) + '...' : line}`)
      }
    })
    
  } catch (error) {
    console.error('❌ Export failed:', error.message)
    console.error('Stack trace:', error.stack)
    process.exit(1)
  }
}

// Run the export
exportGoalsForNotion()