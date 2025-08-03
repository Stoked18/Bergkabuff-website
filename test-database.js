// test-database.js
// Führe diesen Test aus mit: node test-database.js

import { checkDatabaseConnection, goalHelpers, categoryHelpers } from './lib/supabase.js'

async function runDatabaseTests() {
  console.log('🚀 Starting Bergkabuff Database Tests...\n')
  
  // Test 1: Basic Connection
  console.log('📡 Test 1: Basic Database Connection')
  const connectionResult = await checkDatabaseConnection()
  
  if (!connectionResult.success) {
    console.error('❌ Database connection failed!')
    console.error('Error:', connectionResult.message)
    process.exit(1)
  }
  
  console.log('✅ Database connection successful!\n')
  
  // Test 2: Categories laden
  console.log('📂 Test 2: Loading Categories')
  const categoriesResult = await categoryHelpers.getCategories()
  
  if (categoriesResult.success) {
    console.log(`✅ Found ${categoriesResult.data.length} categories:`)
    categoriesResult.data.forEach(cat => {
      console.log(`   ${cat.icon} ${cat.name} (${cat.goal_count} goals)`)
    })
  } else {
    console.error('❌ Failed to load categories:', categoriesResult.message)
  }
  
  console.log()
  
  // Test 3: Goals laden (sollte erstmal leer sein)
  console.log('🎯 Test 3: Loading Goals')
  const goalsResult = await goalHelpers.getGoals({ limit: 5 })
  
  if (goalsResult.success) {
    console.log(`✅ Goals table accessible. Found ${goalsResult.count} goals.`)
    if (goalsResult.count > 0) {
      console.log('   Recent goals:')
      goalsResult.data.forEach(goal => {
        console.log(`   • ${goal.title} (${goal.status}, ${goal.progress}%)`)
      })
    } else {
      console.log('   (No goals yet - ready for migration!)')
    }
  } else {
    console.error('❌ Failed to load goals:', goalsResult.message)
  }
  
  console.log()
  
  // Test 4: Test Goal erstellen und wieder löschen
  console.log('🧪 Test 4: Create & Delete Test Goal')
  const testGoalData = {
    title: 'Database Integration Test ✅',
    category: 'Tech-Projekte',
    status: 'completed',
    priority: 'high',
    progress: 100,
    description: 'This test goal verifies that our database integration is working correctly.',
    resources: {
      test: true,
      created_by: 'database-test-script'
    }
  }
  
  const createResult = await goalHelpers.createGoal(testGoalData)
  
  if (createResult.success) {
    console.log('✅ Test goal created successfully!')
    console.log(`   ID: ${createResult.data.id}`)
    console.log(`   Title: ${createResult.data.title}`)
    
    // Test Goal wieder löschen
    const { supabase } = await import('./lib/supabase.js')
    const { error: deleteError } = await supabase
      .from('goals')
      .delete()
      .eq('id', createResult.data.id)
    
    if (!deleteError) {
      console.log('✅ Test goal deleted successfully!')
    } else {
      console.error('⚠️ Could not delete test goal:', deleteError.message)
    }
  } else {
    console.error('❌ Failed to create test goal:', createResult.message)
  }
  
  console.log()
  
  // Summary
  console.log('🎉 Database Tests Complete!')
  console.log('📊 Summary:')
  console.log(`   • Database: Connected ✅`)
  console.log(`   • Categories: ${categoriesResult.success ? categoriesResult.data.length + ' loaded ✅' : 'Failed ❌'}`)
  console.log(`   • Goals: ${goalsResult.success ? 'Accessible ✅' : 'Failed ❌'}`)
  console.log(`   • CRUD Operations: ${createResult.success ? 'Working ✅' : 'Failed ❌'}`)
  
  if (connectionResult.success && categoriesResult.success && goalsResult.success && createResult.success) {
    console.log('\n🚀 Ready for goal migration!')
  } else {
    console.log('\n⚠️  Some tests failed. Check the errors above.')
  }
}

// Tests ausführen
runDatabaseTests()
  .catch(error => {
    console.error('💥 Test execution failed:', error)
    process.exit(1)
  })