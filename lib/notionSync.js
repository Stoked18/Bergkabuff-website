// lib/notionSync.js - Final Version für Direct API Server
import { supabase } from './supabase'

export class NotionSync {
  constructor() {
    this.apiBaseUrl = 'http://localhost:3001'
    this.isServerMode = true
  }

  async syncFromNotion() {
    try {
      console.log('🔄 Starting REAL Notion sync via Direct API...')
      
      // Check server health first
      const serverHealthy = await this.checkServerHealth()
      if (!serverHealthy) {
        console.warn('⚠️ API Server not available, falling back to simulation')
        return await this.simulateSync()
      }
      
      // Test Notion connection
      await this.testNotionConnection()
      
      // Perform real sync
      const response = await fetch(`${this.apiBaseUrl}/api/sync/notion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Sync failed: ${response.status} ${errorText}`)
      }
      
      const result = await response.json()
      
      if (result.success) {
        console.log('🎉 REAL Notion sync completed successfully!')
        console.log(`📊 Sync Results:`)
        console.log(`   📋 Synced: ${result.synced} goals`)
        console.log(`   🆕 Created: ${result.created} goals`)
        console.log(`   🔄 Updated: ${result.updated} goals`)
        
        if (result.goals && result.goals.length > 0) {
          console.log(`📄 Sample synced goals:`)
          result.goals.forEach((goal, index) => {
            console.log(`   ${index + 1}. ${goal.title} (${goal.status})`)
          })
        }
        
        return {
          success: true,
          synced: result.synced,
          created: result.created,
          updated: result.updated,
          simulation: false,
          real_sync: true,
          timestamp: result.timestamp
        }
      } else {
        throw new Error(result.error || 'Sync failed on server')
      }
      
    } catch (error) {
      console.error('❌ Real Notion sync failed:', error.message)
      
      // Fallback to simulation
      console.log('🎭 Falling back to simulation mode...')
      return await this.simulateSync()
    }
  }

  async checkServerHealth() {
    try {
      const response = await fetch(`${this.apiBaseUrl}/health`, {
        method: 'GET'
      })
      
      if (response.ok) {
        const health = await response.json()
        console.log('✅ API Server is healthy:', health.status)
        return true
      }
      
      return false
    } catch (error) {
      console.log('⚠️ API Server not reachable:', error.message)
      return false
    }
  }

  async testNotionConnection() {
    try {
      console.log('🧪 Testing Notion connection...')
      
      const response = await fetch(`${this.apiBaseUrl}/api/test/notion`)
      
      if (!response.ok) {
        throw new Error(`Connection test failed: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success) {
        console.log('✅ Notion connection confirmed!')
        console.log(`📋 Database: "${result.database.title}"`)
        console.log(`🔧 Properties: ${result.database.property_count} fields`)
        return result
      } else {
        throw new Error(result.error)
      }
      
    } catch (error) {
      console.error('❌ Notion connection test failed:', error.message)
      throw error
    }
  }

  async simulateSync() {
    console.log('🎭 Running sync simulation (fallback mode)...')
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const { data: goals, error } = await supabase
      .from('goals')
      .select('*')
      .eq('is_public', true)
      .order('updated_at', { ascending: false })
    
    if (error) {
      throw new Error(`Supabase error: ${error.message}`)
    }
    
    const syncedGoals = goals.filter(g => g.notion_page_id).length
    
    console.log('✅ Sync simulation completed')
    console.log(`📊 Total goals: ${goals.length}`)
    console.log(`🔗 Notion-linked: ${syncedGoals}`)
    
    return {
      success: true,
      synced: goals.length,
      created: 0,
      updated: goals.length,
      notion_linked: syncedGoals,
      simulation: true,
      real_sync: false,
      timestamp: new Date().toISOString()
    }
  }

  async getGoalsStats() {
    try {
      const { data: goals, error } = await supabase
        .from('goals')
        .select('status, notion_page_id, is_public')
        .eq('is_public', true)
      
      if (error) throw error
      
      const stats = {
        total: goals.length,
        completed: goals.filter(g => g.status === 'completed').length,
        in_progress: goals.filter(g => g.status === 'in_progress').length,
        planned: goals.filter(g => g.status === 'planned').length,
        notion_linked: goals.filter(g => g.notion_page_id).length,
        server_mode: this.isServerMode,
        api_url: this.apiBaseUrl
      }
      
      return stats
    } catch (error) {
      console.error('❌ Error getting stats:', error)
      throw error
    }
  }
}

// Singleton instance
export const notionSync = new NotionSync()