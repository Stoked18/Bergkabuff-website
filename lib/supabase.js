// lib/supabase.js - Minimal Fix für Vite
import { createClient } from '@supabase/supabase-js'
// ENTFERNT: import { config } from 'dotenv'

// ENTFERNT: config({ path: '.env.local' })

// Environment Variables laden (Vite Browser-kompatibel)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Expected:')
  console.error('  VITE_SUPABASE_URL=https://xxx.supabase.co')
  console.error('  VITE_SUPABASE_ANON_KEY=your-anon-key')
  console.error('')
  console.error('Current values:')
  console.error('  VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
  console.error('  VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing')
  throw new Error('Missing Supabase environment variables. Check your .env.local file!')
}

console.log('🔧 Supabase Config:')
console.log('  URL:', supabaseUrl)
console.log('  Key:', supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + '...' : 'Missing')

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'bergkabuff-website'
    }
  }
})

// Helper für bessere Error Handling
export const handleSupabaseError = (error) => {
  console.error('Supabase Error:', error)

  const errorMessages = {
    '23505': 'Dieser Eintrag existiert bereits',
    '23503': 'Referenzierter Eintrag nicht gefunden',
    '42501': 'Nicht autorisiert für diese Aktion',
    'PGRST116': 'Keine Daten gefunden'
  }

  const userMessage = errorMessages[error.code] || error.message || 'Ein unbekannter Fehler ist aufgetreten'

  return {
    error: true,
    message: userMessage,
    originalError: error
  }
}

// Database health check
export const checkDatabaseConnection = async () => {
  try {
    console.log('🔄 Testing database connection...')

    // Test 1: Categories abrufen
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(3)

    if (categoriesError) throw categoriesError

    console.log('✅ Categories table accessible:', categories.length, 'entries')

    // Test 2: Goals table testen
    const { data: goals, error: goalsError } = await supabase
      .from('goals')
      .select('count')
      .limit(1)

    if (goalsError) throw goalsError

    console.log('✅ Goals table accessible')

    // Test 3: Test-Goal erstellen und wieder löschen
    const testGoal = {
      title: 'Database Connection Test',
      category: 'Tech-Projekte',
      status: 'planned',
      priority: 'low',
      progress: 0,
      description: 'This is a test goal to verify database connectivity'
    }

    const { data: createdGoal, error: createError } = await supabase
      .from('goals')
      .insert([testGoal])
      .select()
      .single()

    if (createError) throw createError

    console.log('✅ Goal creation successful:', createdGoal.id)

    // Test-Goal wieder löschen
    const { error: deleteError } = await supabase
      .from('goals')
      .delete()
      .eq('id', createdGoal.id)

    if (deleteError) throw deleteError

    console.log('✅ Goal deletion successful')

    console.log('🎉 Database connection fully operational!')
    return {
      success: true,
      message: 'Database connection successful',
      categoriesCount: categories.length
    }

  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return {
      success: false,
      message: error.message,
      error
    }
  }
}

// Goal data helpers
export const goalHelpers = {
  async getGoals(filters = {}) {
    let query = supabase
      .from('goals')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters.category && filters.category !== 'Alle') {
      query = query.eq('category', filters.category)
    }
    if (filters.status && filters.status !== 'Alle Status') {
      query = query.eq('status', filters.status)
    }
    if (filters.priority && filters.priority !== 'Alle Prioritäten') {
      query = query.eq('priority', filters.priority)
    }
    if (filters.search) {
      query = query.ilike('title', `%${filters.search}%`)
    }
    if (filters.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      return handleSupabaseError(error)
    }

    return {
      success: true,
      data,
      count: data.length
    }
  },

  async createGoal(goalData) {
    const { data, error } = await supabase
      .from('goals')
      .insert([goalData])
      .select()
      .single()

    if (error) {
      return handleSupabaseError(error)
    }

    return {
      success: true,
      data
    }
  }
}

// Categories helper
export const categoryHelpers = {
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      return handleSupabaseError(error)
    }

    return {
      success: true,
      data
    }
  }
}