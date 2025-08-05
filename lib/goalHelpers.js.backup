import { supabase } from './supabase'

export const goalHelpers = {
  async getGoals() {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      
      return data || []
    } catch (error) {
      console.error('Error in getGoals:', error)
      throw error
    }
  },

  async createGoal(goalData) {
    try {
      const { data, error } = await supabase
        .from('goals')
        .insert([goalData])
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error in createGoal:', error)
      throw error
    }
  },

  async updateGoal(goalId, updates) {
    try {
      const { data, error } = await supabase
        .from('goals')
        .update(updates)
        .eq('id', goalId)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error in updateGoal:', error)
      throw error
    }
  }
}