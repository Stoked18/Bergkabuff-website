// scripts/export-to-notion.js
// Exportiert alle 53 Goals aus Supabase für Notion Import

import { goalHelpers } from '../lib/goalHelpers.js'
import fs from 'fs'

async function exportGoalsForNotion() {
  try {
    console.log('📤 Exporting 53 goals from Supabase for Notion...')
    
    // Alle Goals mit enhanced Schema laden
    const goals = await goalHelpers.getGoalsEnhanced()
    
    console.log(`📊 Found ${goals.length} goals in Supabase`)
    
    // Kategorien analysieren
    const categories = [...new Set(goals.map(g => g.category).filter(Boolean))]
    console.log(`📁 Categories found: ${categories.join(', ')}`)
    
    // CSV Header - exakt passend zu Notion Properties
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
    
    // CSV Rows generieren
    const csvRows = goals.map(goal => {
      return [
        // Title - Anführungszeichen für Sicherheit
        `"${(goal.title || '').replace(/"/g, '""')}"`,
        
        // Description - Mehrzeilig möglich
        `"${(goal.description || '').replace(/"/g, '""')}"`,
        
        // Status - direkt mapping
        goal.status || 'planned',
        
        // Priority - direkt mapping  
        goal.priority || 'medium',
        
        // Category - direkt mapping
        goal.category || 'Allgemein',
        
        // Progress - Zahl ohne Anführungszeichen
        goal.progress || 0,
        
        // Website ID - UUID als Text für Notion
        `"${goal.id}"`,
        
        // Deadline - ISO Date Format
        goal.deadline || '',
        
        // Public - Boolean als Text
        goal.is_public !== false ? 'true' : 'false',
        
        // Tags - Array als komma-separiert
        `"${(goal.tags || []).join(', ')}"`,
        
        // Resources - URL extrahieren falls vorhanden
        goal.resources?.links?.[0]?.url || '',
        
        // Reflection - Text field
        `"${(goal.reflection || '').replace(/"/g, '""')}"`,
        
        // Difficulty - Number
        goal.difficulty_level || ''
      ]
    })
    
    // CSV Content zusammenbauen
    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n')
    
    // CSV File schreiben
    const csvFileName = 'bergkabuff-goals-for-notion.csv'
    fs.writeFileSync(csvFileName, csvContent, 'utf8')
    
    // JSON Backup erstellen
    const jsonData = {
      exported_at: new Date().toISOString(),
      total_goals: goals.length,
      categories: categories,
      goals: goals
    }
    
    const jsonFileName = 'bergkabuff-goals-backup.json'
    fs.writeFileSync(jsonFileName, JSON.stringify(jsonData, null, 2))
    
    // Erfolgs-Report
    console.log(`\n✅ Export completed successfully!`)
    console.log(`📄 Files created:`)
    console.log(`   📊 ${csvFileName} (${goals.length} goals für Notion Import)`)
    console.log(`   💾 ${jsonFileName} (Backup)`)
    console.log(`\n📋 Import Instructions:`)
    console.log(`   1. Öffne deine Notion Database`)
    console.log(`   2. Klicke "..." → "Import"`)
    console.log(`   3. Wähle "${csvFileName}"`)
    console.log(`   4. Spalten zuordnen und importieren`)
    console.log(`\n🎯 Categories in your data:`)
    categories.forEach(cat => console.log(`   - ${cat}`))
    
    // Statistiken
    const stats = {
      total: goals.length,
      completed: goals.filter(g => g.status === 'completed').length,
      in_progress: goals.filter(g => g.status === 'in_progress').length,
      planned: goals.filter(g => g.status === 'planned').length,
      with_description: goals.filter(g => g.description && g.description.trim()).length,
      with_tags: goals.filter(g => g.tags && g.tags.length > 0).length
    }
    
    console.log(`\n📊 Data Statistics:`)
    console.log(`   🎯 Total Goals: ${stats.total}`)
    console.log(`   ✅ Completed: ${stats.completed}`)
    console.log(`   🔄 In Progress: ${stats.in_progress}`)
    console.log(`   📋 Planned: ${stats.planned}`)
    console.log(`   📝 With Description: ${stats.with_description}`)
    console.log(`   🏷️ With Tags: ${stats.with_tags}`)
    
  } catch (error) {
    console.error('❌ Export failed:', error)
    console.error('Stack:', error.stack)
  }
}

// Script ausführen
exportGoalsForNotion()