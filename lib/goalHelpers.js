// lib/goalHelpers.js - Enhanced mit vollem Schema Support
import { supabase } from './supabase'

export const goalHelpers = {
  // Enhanced getGoals mit allen verfügbaren Feldern
  async getGoalsEnhanced() {
    try {
      console.log('🔍 Loading goals with enhanced schema...')
      
      const { data, error } = await supabase
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
        console.error('❌ Supabase query error:', error)
        throw error
      }
      
      console.log(`✅ Loaded ${data?.length || 0} goals with enhanced schema`)
      
      // Process and clean the data
      const processedGoals = data?.map(goal => ({
        ...goal,
        // Ensure arrays are properly handled
        tags: Array.isArray(goal.tags) ? goal.tags : [],
        // Ensure resources is an object
        resources: goal.resources && typeof goal.resources === 'object' ? goal.resources : {},
        // Ensure progress is a number
        progress: parseInt(goal.progress) || 0,
        // Format dates
        deadline: goal.deadline ? new Date(goal.deadline).toISOString().split('T')[0] : null,
        created_at: goal.created_at ? new Date(goal.created_at).toISOString() : null,
        updated_at: goal.updated_at ? new Date(goal.updated_at).toISOString() : null,
      })) || []
      
      return processedGoals
    } catch (error) {
      console.error('❌ Error in getGoalsEnhanced:', error)
      throw error
    }
  },

  // Backward compatibility - fallback to original method
  async getGoals() {
    try {
      // Try enhanced version first
      return await this.getGoalsEnhanced()
    } catch (error) {
      console.warn('⚠️ Enhanced goals loading failed, falling back to basic version')
      
      // Fallback to basic version
      const { data, error: basicError } = await supabase
        .from('goals')
        .select(`
          id,
          title,
          status,
          priority,
          category,
          progress,
          deadline,
          created_at
        `)
        .order('created_at', { ascending: false })
      
      if (basicError) {
        console.error('❌ Basic goals query also failed:', basicError)
        throw basicError
      }
      
      return data || []
    }
  },

  // Get single goal with full details
  async getGoalById(goalId) {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('id', goalId)
        .single()
      
      if (error) {
        console.error('❌ Error fetching goal by ID:', error)
        throw error
      }
      
      return data
    } catch (error) {
      console.error('❌ Error in getGoalById:', error)
      throw error
    }
  },

  // Create new goal
  async createGoal(goalData) {
    try {
      console.log('🔄 Creating new goal:', goalData.title)
      
      const { data, error } = await supabase
        .from('goals')
        .insert([{
          title: goalData.title,
          description: goalData.description || null,
          status: goalData.status || 'planned',
          priority: goalData.priority || 'medium',
          category: goalData.category,
          progress: goalData.progress || 0,
          deadline: goalData.deadline || null,
          difficulty_level: goalData.difficulty_level || null,
          is_public: goalData.is_public !== false,
          tags: goalData.tags || [],
          resources: goalData.resources || {},
          estimated_duration_days: goalData.estimated_duration_days || null
        }])
        .select()
        .single()
      
      if (error) {
        console.error('❌ Error creating goal:', error)
        throw error
      }
      
      console.log('✅ Goal created successfully:', data.id)
      return data
    } catch (error) {
      console.error('❌ Error in createGoal:', error)
      throw error
    }
  },

  // Update existing goal
  async updateGoal(goalId, updates) {
    try {
      console.log('🔄 Updating goal:', goalId)
      
      // Add updated_at timestamp
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString()
      }
      
      const { data, error } = await supabase
        .from('goals')
        .update(updateData)
        .eq('id', goalId)
        .select()
        .single()
      
      if (error) {
        console.error('❌ Error updating goal:', error)
        throw error
      }
      
      console.log('✅ Goal updated successfully:', goalId)
      return data
    } catch (error) {
      console.error('❌ Error in updateGoal:', error)
      throw error
    }
  },

  // Update only progress
  async updateProgress(goalId, newProgress) {
    try {
      console.log('🔄 Updating progress for goal:', goalId, 'to', newProgress + '%')
      
      const { data, error } = await supabase
        .from('goals')
        .update({ 
          progress: newProgress,
          updated_at: new Date().toISOString()
        })
        .eq('id', goalId)
        .select()
        .single()
      
      if (error) {
        console.error('❌ Error updating progress:', error)
        throw error
      }
      
      console.log('✅ Progress updated successfully')
      return data
    } catch (error) {
      console.error('❌ Error in updateProgress:', error)
      throw error
    }
  },

  // Delete goal
  async deleteGoal(goalId) {
    try {
      console.log('🗑️ Deleting goal:', goalId)
      
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', goalId)
      
      if (error) {
        console.error('❌ Error deleting goal:', error)
        throw error
      }
      
      console.log('✅ Goal deleted successfully')
      return true
    } catch (error) {
      console.error('❌ Error in deleteGoal:', error)
      throw error
    }
  },

  // Get statistics
  async getStats() {
    try {
      console.log('📊 Calculating statistics...')
      
      const { data, error } = await supabase
        .from('goals')
        .select('status, progress, is_public')
        .eq('is_public', true)
      
      if (error) {
        console.error('❌ Error fetching stats:', error)
        throw error
      }
      
      const stats = {
        total: data.length,
        completed: data.filter(g => g.status === 'completed').length,
        in_progress: data.filter(g => g.status === 'in_progress').length,
        planned: data.filter(g => g.status === 'planned').length,
        paused: data.filter(g => g.status === 'paused').length,
        averageProgress: data.length > 0 ? Math.round(
          data.reduce((sum, g) => sum + (g.progress || 0), 0) / data.length
        ) : 0
      }
      
      console.log('✅ Statistics calculated:', stats)
      return stats
    } catch (error) {
      console.error('❌ Error in getStats:', error)
      throw error
    }
  },

  // Get categories with counts
  async getCategories() {
    try {
      console.log('📁 Loading categories...')
      
      const { data, error } = await supabase
        .from('goals')
        .select('category')
        .eq('is_public', true)
      
      if (error) {
        console.error('❌ Error fetching categories:', error)
        throw error
      }
      
      const categoryCounts = data.reduce((acc, goal) => {
        const category = goal.category || 'Uncategorized'
        acc[category] = (acc[category] || 0) + 1
        return acc
      }, {})
      
      const categories = Object.entries(categoryCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
      
      console.log('✅ Categories loaded:', categories)
      return categories
    } catch (error) {
      console.error('❌ Error in getCategories:', error)
      throw error
    }
  },

  // Search goals
  async searchGoals(query, filters = {}) {
    try {
      console.log('🔍 Searching goals:', query, filters)
      
      let supabaseQuery = supabase
        .from('goals')
        .select('*')
        .eq('is_public', true)
      
      // Text search in title and description
      if (query) {
        supabaseQuery = supabaseQuery.or(
          `title.ilike.%${query}%,description.ilike.%${query}%`
        )
      }
      
      // Apply filters
      if (filters.category && filters.category !== 'Alle') {
        supabaseQuery = supabaseQuery.eq('category', filters.category)
      }
      
      if (filters.status && filters.status !== 'Alle Status') {
        supabaseQuery = supabaseQuery.eq('status', filters.status)
      }
      
      if (filters.priority && filters.priority !== 'Alle Prioritäten') {
        supabaseQuery = supabaseQuery.eq('priority', filters.priority)
      }
      
      const { data, error } = await supabaseQuery.order('created_at', { ascending: false })
      
      if (error) {
        console.error('❌ Error searching goals:', error)
        throw error
      }
      
      console.log(`✅ Search completed: ${data.length} results`)
      return data
    } catch (error) {
      console.error('❌ Error in searchGoals:', error)
      throw error
    }
  },

  // Bulk update goals
  async bulkUpdateStatus(goalIds, newStatus) {
    try {
      console.log('🔄 Bulk updating status for goals:', goalIds, 'to', newStatus)
      
      const { data, error } = await supabase
        .from('goals')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .in('id', goalIds)
        .select()
      
      if (error) {
        console.error('❌ Error in bulk update:', error)
        throw error
      }
      
      console.log('✅ Bulk update completed:', data.length, 'goals updated')
      return data
    } catch (error) {
      console.error('❌ Error in bulkUpdateStatus:', error)
      throw error
    }
  },

  // Add progress update (for history tracking)
  async addProgressUpdate(goalId, oldProgress, newProgress, note = '') {
    try {
      console.log('📈 Adding progress update:', goalId, oldProgress, '→', newProgress)
      
      const { data, error } = await supabase
        .from('progress_updates')
        .insert([{
          goal_id: goalId,
          old_progress: oldProgress,
          new_progress: newProgress,
          update_note: note,
          update_type: 'manual'
        }])
        .select()
        .single()
      
      if (error) {
        console.error('❌ Error adding progress update:', error)
        throw error
      }
      
      console.log('✅ Progress update added')
      return data
    } catch (error) {
      console.error('❌ Error in addProgressUpdate:', error)
      throw error
    }
  },

  // Get progress history for a goal
  async getProgressHistory(goalId) {
    try {
      console.log('📊 Loading progress history for goal:', goalId)
      
      const { data, error } = await supabase
        .from('progress_updates')
        .select('*')
        .eq('goal_id', goalId)
        .order('created_at', { ascending: true })
      
      if (error) {
        console.error('❌ Error fetching progress history:', error)
        throw error
      }
      
      console.log('✅ Progress history loaded:', data.length, 'updates')
      return data
    } catch (error) {
      console.error('❌ Error in getProgressHistory:', error)
      throw error
    }
  },

  // Sync with Notion (placeholder for API call)
  async syncWithNotion() {
    try {
      console.log('🔄 Triggering Notion sync...')
      
      const response = await fetch('/api/sync/notion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success) {
        console.log('✅ Notion sync successful:', result.synced, 'goals processed')
        return result
      } else {
        throw new Error(result.error || 'Sync failed')
      }
    } catch (error) {
      console.error('❌ Error in syncWithNotion:', error)
      throw error
    }
  },

  // Test database connection
  async testConnection() {
    try {
      console.log('🔍 Testing database connection...')
      
      const { data, error } = await supabase
        .from('goals')
        .select('count', { count: 'exact', head: true })
      
      if (error) {
        console.error('❌ Database connection test failed:', error)
        return { success: false, error: error.message }
      }
      
      console.log('✅ Database connection successful. Total goals:', data)
      return { success: true, count: data }
    } catch (error) {
      console.error('❌ Error in testConnection:', error)
      return { success: false, error: error.message }
    }
  },

  // Validate goal data
  validateGoalData(goalData) {
    const errors = []
    
    if (!goalData.title || goalData.title.trim().length < 3) {
      errors.push('Titel muss mindestens 3 Zeichen lang sein')
    }
    
    if (!goalData.category || goalData.category.trim().length === 0) {
      errors.push('Kategorie ist erforderlich')
    }
    
    if (goalData.progress !== undefined) {
      const progress = parseInt(goalData.progress)
      if (isNaN(progress) || progress < 0 || progress > 100) {
        errors.push('Fortschritt muss zwischen 0 und 100 liegen')
      }
    }
    
    if (goalData.priority && !['high', 'medium', 'low'].includes(goalData.priority)) {
      errors.push('Priorität muss high, medium oder low sein')
    }
    
    if (goalData.status && !['planned', 'in_progress', 'completed', 'paused', 'cancelled'].includes(goalData.status)) {
      errors.push('Status ist ungültig')
    }
    
    if (goalData.deadline) {
      const deadline = new Date(goalData.deadline)
      if (isNaN(deadline.getTime())) {
        errors.push('Deadline hat ungültiges Datumsformat')
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  },

  // Format goal for display
  formatGoalForDisplay(goal) {
    return {
      ...goal,
      formattedDeadline: goal.deadline ? 
        new Date(goal.deadline).toLocaleDateString('de-DE') : 
        'Kein Deadline',
      formattedCreatedAt: goal.created_at ? 
        new Date(goal.created_at).toLocaleDateString('de-DE') : 
        'Unbekannt',
      progressDisplay: `${goal.progress || 0}%`,
      statusDisplay: this.getStatusDisplay(goal.status),
      priorityDisplay: this.getPriorityDisplay(goal.priority),
      tagsDisplay: (goal.tags || []).join(', ') || 'Keine Tags'
    }
  },

  // Helper functions for display
  getStatusDisplay(status) {
    const statusMap = {
      planned: 'Geplant',
      in_progress: 'In Arbeit',
      completed: 'Abgeschlossen',
      paused: 'Pausiert',
      cancelled: 'Abgebrochen'
    }
    return statusMap[status] || status
  },

  getPriorityDisplay(priority) {
    const priorityMap = {
      high: 'Hoch',
      medium: 'Mittel',
      low: 'Niedrig'
    }
    return priorityMap[priority] || priority
  },

  // Export goals to JSON
  async exportGoals() {
    try {
      console.log('📤 Exporting goals...')
      
      const goals = await this.getGoalsEnhanced()
      const exportData = {
        exported_at: new Date().toISOString(),
        version: '1.0',
        total_goals: goals.length,
        goals: goals
      }
      
      console.log('✅ Goals exported successfully')
      return exportData
    } catch (error) {
      console.error('❌ Error in exportGoals:', error)
      throw error
    }
  }
}

// Export individual functions for convenience
export const {
  getGoals,
  getGoalsEnhanced,
  getGoalById,
  createGoal,
  updateGoal,
  updateProgress,
  deleteGoal,
  getStats,
  getCategories,
  searchGoals,
  bulkUpdateStatus,
  addProgressUpdate,
  getProgressHistory,
  syncWithNotion,
  testConnection,
  validateGoalData,
  formatGoalForDisplay,
  exportGoals
} = goalHelpers