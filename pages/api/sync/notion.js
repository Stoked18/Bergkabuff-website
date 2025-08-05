// pages/api/sync/notion.js - Notion Synchronisation API
import { Client } from '@notionhq/client'
import { supabase } from '../../../lib/supabase'

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
    })
  }

  try {
    console.log('🔄 Starting Notion sync...')
    
    // Check if environment variables are set
    if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
      throw new Error('Notion environment variables not configured')
    }

    const syncResult = await syncNotionToSupabase()
    
    console.log('✅ Notion sync completed successfully')
    
    return res.status(200).json({
      success: true,
      synced: syncResult.synced,
      created: syncResult.created,
      updated: syncResult.updated,
      errors: syncResult.errors,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('❌ Notion sync failed:', error)
    
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
}

async function syncNotionToSupabase() {
  const result = {
    synced: 0,
    created: 0,
    updated: 0,
    errors: []
  }

  try {
    console.log('📖 Fetching goals from Notion...')
    
    // Query all pages from Notion database
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: 'Created',
          direction: 'descending'
        }
      ]
    })

    console.log(`📋 Found ${response.results.length} goals in Notion`)

    // Process each Notion page
    for (const page of response.results) {
      try {
        const goalData = transformNotionPageToGoal(page)
        const websiteId = getWebsiteIdFromNotion(page)
        
        if (websiteId) {
          // Update existing goal
          await updateGoalInSupabase(websiteId, goalData, page.id)
          result.updated++
        } else {
          // Create new goal
          const newGoal = await createGoalInSupabase(goalData, page.id)
          if (newGoal) {
            // Update Notion with the new Website ID
            await updateNotionWithWebsiteId(page.id, newGoal.id)
            result.created++
          }
        }
        
        result.synced++
        
      } catch (error) {
        console.error(`❌ Error processing goal: ${page.id}`, error)
        result.errors.push({
          pageId: page.id,
          error: error.message
        })
      }
    }

    return result
    
  } catch (error) {
    console.error('❌ Error in syncNotionToSupabase:', error)
    throw error
  }
}

function transformNotionPageToGoal(notionPage) {
  const props = notionPage.properties
  
  return {
    title: getTextFromNotion(props.Title) || 'Untitled Goal',
    description: getTextFromNotion(props.Description) || null,
    status: getSelectFromNotion(props.Status) || 'planned',
    priority: getSelectFromNotion(props.Priority) || 'medium',
    category: getSelectFromNotion(props.Category) || 'Allgemein',
    progress: getNumberFromNotion(props.Progress) || 0,
    deadline: getDateFromNotion(props.Deadline) || null,
    difficulty_level: getNumberFromNotion(props.Difficulty) || null,
    is_public: getCheckboxFromNotion(props.Public) !== false,
    tags: getMultiSelectFromNotion(props.Tags) || [],
    resources: {
      links: getTextFromNotion(props.Resources) ? 
        [{ title: 'Resource', url: getTextFromNotion(props.Resources) }] : 
        []
    },
    reflection: getTextFromNotion(props.Reflection) || null,
    notion_page_id: notionPage.id,
    updated_at: new Date().toISOString()
  }
}

function getWebsiteIdFromNotion(notionPage) {
  const websiteId = getNumberFromNotion(notionPage.properties['Website ID'])
  return websiteId ? String(websiteId) : null
}

async function updateGoalInSupabase(goalId, goalData, notionPageId) {
  try {
    console.log(`🔄 Updating goal ${goalId} in Supabase...`)
    
    const { data, error } = await supabase
      .from('goals')
      .update({
        ...goalData,
        notion_page_id: notionPageId
      })
      .eq('id', goalId)
      .select()
      .single()
    
    if (error) {
      throw error
    }
    
    console.log(`✅ Goal ${goalId} updated successfully`)
    return data
    
  } catch (error) {
    console.error(`❌ Error updating goal ${goalId}:`, error)
    throw error
  }
}

async function createGoalInSupabase(goalData, notionPageId) {
  try {
    console.log('🆕 Creating new goal in Supabase...')
    
    const { data, error } = await supabase
      .from('goals')
      .insert([{
        ...goalData,
        notion_page_id: notionPageId
      }])
      .select()
      .single()
    
    if (error) {
      throw error
    }
    
    console.log(`✅ New goal created with ID: ${data.id}`)
    return data
    
  } catch (error) {
    console.error('❌ Error creating goal:', error)
    throw error
  }
}

async function updateNotionWithWebsiteId(pageId, websiteId) {
  try {
    console.log(`🔄 Updating Notion page ${pageId} with Website ID ${websiteId}...`)
    
    await notion.pages.update({
      page_id: pageId,
      properties: {
        'Website ID': {
          number: parseInt(websiteId)
        }
      }
    })
    
    console.log(`✅ Notion page updated with Website ID`)
    
  } catch (error) {
    console.error('❌ Error updating Notion with Website ID:', error)
    // Don't throw error here, as the goal was created successfully
    console.warn('⚠️ Continuing despite Notion update failure')
  }
}

// Helper functions to extract data from Notion properties
function getTextFromNotion(property) {
  if (!property) return null
  
  if (property.title && property.title.length > 0) {
    return property.title[0].plain_text
  }
  
  if (property.rich_text && property.rich_text.length > 0) {
    return property.rich_text[0].plain_text
  }
  
  return null
}

function getSelectFromNotion(property) {
  if (!property || !property.select) return null
  return property.select.name?.toLowerCase()
}

function getMultiSelectFromNotion(property) {
  if (!property || !property.multi_select) return []
  return property.multi_select.map(item => item.name)
}

function getNumberFromNotion(property) {
  if (!property) return null
  return property.number
}

function getDateFromNotion(property) {
  if (!property || !property.date) return null
  return property.date.start
}

function getCheckboxFromNotion(property) {
  if (!property) return false
  return property.checkbox
}

// Alternative API endpoint for manual sync trigger
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}