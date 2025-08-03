// migrate-all-goals.js
// Migriert ALLE 50 Goals von hardcoded zu Database

import { supabase, goalHelpers } from './lib/supabase.js'

console.log('🚀 Starting FULL Bergkabuff Goal Migration...')

// Alle 50 Goals (komplette Liste)
const ALL_GOALS = [
  {
    id: 1,
    title: "Eine Website erstellen und veröffentlichen",
    status: "In Arbeit",
    priority: "Hoch",
    deadline: "31. Dezember 2025",
    progress: 85,
    category: "Tech-Projekte",
  },
  {
    id: 2,
    title: "Einen Youtube Kanal starten und ein gut editiertes Video hochladen",
    status: "In Arbeit",
    priority: "Hoch",
    deadline: "31. Dezember 2025",
    progress: 60,
    category: "Kreative Projekte",
  },
  {
    id: 3,
    title: "Eine eigene App erstellen und veröffentlichen",
    status: "Geplant",
    priority: "Hoch",
    deadline: "31. Dezember 2025",
    progress: 0,
    category: "Tech-Projekte",
  },
  {
    id: 4,
    title: "Ein Gaming-Zimmer für mich und meine Frau kreieren",
    status: "In Arbeit",
    priority: "Hoch",
    deadline: "31. Dezember 2025",
    progress: 25,
    category: "Kreative Projekte",
  },
  {
    id: 5,
    title: "Mein eigenes Körpergewicht 3x sauber beim Bankdrücken heben können",
    status: "In Arbeit",
    priority: "Hoch",
    deadline: "31. Dezember 2025",
    progress: 70,
    category: "Persönliche Challenges",
  },
  {
    id: 6,
    title: "Japanisch lernen N3 Niveau",
    status: "In Arbeit",
    priority: "Hoch",
    deadline: "31. Dezember 2026",
    progress: 20,
    category: "Lernen & Bildung",
  },
  {
    id: 7,
    title: "Die Liebe meines Lebens finden",
    status: "Abgeschlossen",
    priority: "Hoch",
    deadline: "31. Dezember 2025",
    progress: 100,
    category: "Große Lebensziele",
  },
  {
    id: 8,
    title: "Ein eigenes Haus kaufen",
    status: "Abgeschlossen",
    priority: "Hoch",
    deadline: "31. Dezember 2025",
    progress: 100,
    category: "Große Lebensziele",
  },
  {
    id: 9,
    title: "Einen Hund großziehen",
    status: "Abgeschlossen",
    priority: "Hoch",
    deadline: "31. Dezember 2025",
    progress: 100,
    category: "Persönliche Challenges",
  },
  {
    id: 10,
    title: "Ein Slipknot-Konzert besuchen",
    status: "Abgeschlossen",
    priority: "Hoch",
    deadline: "31. Dezember 2025",
    progress: 100,
    category: "Besondere Erlebnisse",
  },
  {
    id: 11,
    title: "Einen Baum pflanzen",
    status: "Abgeschlossen",
    priority: "Hoch",
    deadline: "31. Dezember 2025",
    progress: 100,
    category: "Persönliche Challenges",
  },
  {
    id: 12,
    title: "Japan besuchen",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2026",
    progress: 0,
    category: "Reisen & Abenteuer",
  },
  {
    id: 13,
    title: "Jedes Land in Europa besuchen",
    status: "In Arbeit",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 38,
    category: "Reisen & Abenteuer",
  },
  {
    id: 14,
    title: "Den rechten Arm sleeven lassen",
    status: "In Arbeit",
    priority: "Mittel",
    deadline: "31. Dezember 2028",
    progress: 30,
    category: "Persönliche Challenges",
  },
  {
    id: 15,
    title: "Das Wiehengebirge durchwandern",
    status: "In Arbeit",
    priority: "Mittel",
    deadline: "31. Dezember 2027",
    progress: 25,
    category: "Persönliche Challenges",
  },
  {
    id: 16,
    title: "Eine Bahn im Schwimmbad ohne Hilfe schwimmen",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2027",
    progress: 25,
    category: "Persönliche Challenges",
  },
  {
    id: 17,
    title: "Ein eigenes Klemmbausteinset entwerfen",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2026",
    progress: 0,
    category: "Kreative Projekte",
  },
  {
    id: 18,
    title: "Ein Buch schreiben und veröffentlichen",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Kreative Projekte",
  },
  {
    id: 19,
    title: "Einen Lamborghini selber fahren",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Besondere Erlebnisse",
  },
  {
    id: 20,
    title: "Einen sauberen Handstand 10s halten",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2026",
    progress: 0,
    category: "Persönliche Challenges",
  },
  {
    id: 21,
    title: "Eine Woche Digital Detox durchziehen",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2027",
    progress: 0,
    category: "Persönliche Challenges",
  },
  {
    id: 22,
    title: "Ein vollständiges Lied auf dem Klavier lernen",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Lernen & Bildung",
  },
  {
    id: 23,
    title: "Eine Wintersportart ausprobieren",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Persönliche Challenges",
  },
  {
    id: 24,
    title: "Mit dem Fahrrad zur Nordsee fahren",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Reisen & Abenteuer",
  },
  {
    id: 25,
    title: "Ein Bild/Gemälde malen",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2026",
    progress: 0,
    category: "Kreative Projekte",
  },
  {
    id: 26,
    title: "Ein eigenes Gericht kreieren, benennen und veröffentlichen",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2026",
    progress: 0,
    category: "Kreative Projekte",
  },
  {
    id: 27,
    title: "In einem Rennwagen auf der Rennstrecke mitfahren",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2027",
    progress: 0,
    category: "Besondere Erlebnisse",
  },
  {
    id: 28,
    title: "In einem Rallye-Auto mitfahren",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Besondere Erlebnisse",
  },
  {
    id: 29,
    title: "Auf die Zugspitze",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2027",
    progress: 0,
    category: "Reisen & Abenteuer",
  },
  {
    id: 30,
    title: "Einen Kinky Club besuchen",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2027",
    progress: 0,
    category: "Besondere Erlebnisse",
  },
  {
    id: 31,
    title: "Einen Stand-Up Auftritt machen",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Persönliche Challenges",
  },
  {
    id: 32,
    title: "Einen eigenen Song schreiben, erstellen und veröffentlichen",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2026",
    progress: 0,
    category: "Kreative Projekte",
  },
  {
    id: 33,
    title: "Ein eigenes Videospiel erstellen und veröffentlichen",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2026",
    progress: 0,
    category: "Tech-Projekte",
  },
  {
    id: 34,
    title: "Singapur besuchen",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Reisen & Abenteuer",
  },
  {
    id: 35,
    title: "In einem guten Molekularküche-Restaurant essen gehen",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2027",
    progress: 0,
    category: "Besondere Erlebnisse",
  },
  {
    id: 36,
    title: "Die Polarlichter sehen",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Reisen & Abenteuer",
  },
  {
    id: 37,
    title: "Den Polarkreis überqueren",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Reisen & Abenteuer",
  },
  {
    id: 38,
    title: "Ein Korn-Konzert besuchen",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2027",
    progress: 0,
    category: "Besondere Erlebnisse",
  },
  {
    id: 39,
    title: "Eine Woche autark in einer Waldhütte wohnen",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2027",
    progress: 0,
    category: "Reisen & Abenteuer",
  },
  {
    id: 40,
    title: "Eine KZ-Gedenkstätte besuchen",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2027",
    progress: 0,
    category: "Reisen & Abenteuer",
  },
  {
    id: 41,
    title: "Einen eigenen Whirlpool besitzen",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Große Lebensziele",
  },
  {
    id: 42,
    title: "Ein eigenes Comic erstellen",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Kreative Projekte",
  },
  {
    id: 43,
    title: "Eine Umweltaktion organisieren",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2027",
    progress: 0,
    category: "Große Lebensziele",
  },
  {
    id: 44,
    title: "Ein Gedicht schreiben",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Kreative Projekte",
  },
  {
    id: 45,
    title: "3-Tage Survival ohne Vorräte",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Persönliche Challenges",
  },
  {
    id: 46,
    title: "Eine Oper besuchen",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Besondere Erlebnisse",
  },
  {
    id: 47,
    title: "Das Kliemannsland besuchen",
    status: "Geplant",
    priority: "Mittel",
    deadline: "31. Dezember 2026",
    progress: 0,
    category: "Reisen & Abenteuer",
  },
  {
    id: 48,
    title: "Fynn Kliemann treffen",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Personen treffen",
  },
  {
    id: 49,
    title: "Maximilian Knabe treffen",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Personen treffen",
  },
  {
    id: 50,
    title: "Dwayne Johnson treffen",
    status: "Geplant",
    priority: "Niedrig",
    deadline: "31. Dezember 2030",
    progress: 0,
    category: "Personen treffen",
  }
]

// Enhanced Descriptions
const getDescription = (goal) => {
  const descriptions = {
    1: "Vollständige Entwicklung einer interaktiven Website mit React, modernem Design und Hosting. Das Bergkabuff-Projekt als digitale Heimat.",
    2: "Professioneller YouTube-Kanal mit regelmäßigen Videos über die Bucketlist-Reise. Erstes Video soll mindestens 1000 Aufrufe erreichen.",
    3: "Mobile App für iOS und Android mit React Native. Soll die Website ergänzen und unterwegs Bucketlist-Tracking ermöglichen.",
    4: "Gemütlicher Raum für gemeinsame Gaming-Sessions. Zwei Gaming-Stühle, großer Monitor, RGB-Beleuchtung und alles was dazugehört.",
    5: "Aktuell bei ca. 2x Körpergewicht. Systematisches Training mit Trainingsplan, Ernährungsoptimierung und Progression tracking.",
    6: "Von Grundlagen bis N3-Niveau durch strukturierten Sprachkurs, Anime/Manga und Konversationspraxis. Vorbereitung für Japan-Reise.",
    7: "Mission erfolgreich abgeschlossen! Die perfekte Partnerin gefunden und gemeinsam das Leben aufgebaut.",
    8: "Eigenheim erworben! Unser 'Bergkabuff' ist jetzt Realität - der perfekte Ort für alle weiteren Projekte.",
    9: "Unser Hund wurde erfolgreich großgezogen und ist ein vollwertiges Familienmitglied geworden.",
    10: "Unvergessliches Konzert erlebt! Die Energie und Musik waren genau so episch wie erwartet.",
    11: "Baum gepflanzt und damit einen kleinen Beitrag für die Umwelt geleistet.",
    12: "Traumreise nach Japan zur Kirschblütenzeit. Tokyo, Kyoto, Osaka erkunden und die Kultur vollständig erleben."
  }
  
  return descriptions[goal.id] || `${goal.title} - Detaillierte Planung und Umsetzung als Teil der Bergkabuff-Journey.`
}

// Transformation Functions
const transformStatus = (status) => {
  const statusMap = {
    'Abgeschlossen': 'completed',
    'In Arbeit': 'in_progress',
    'Geplant': 'planned'
  }
  return statusMap[status] || 'planned'
}

const transformPriority = (priority) => {
  const priorityMap = {
    'Hoch': 'high',
    'Mittel': 'medium',
    'Niedrig': 'low'
  }
  return priorityMap[priority] || 'medium'
}

const transformDeadline = (deadline) => {
  if (!deadline) return null
  
  const parts = deadline.split(' ')
  if (parts.length !== 3) return null
  
  const months = {
    'Januar': '01', 'Februar': '02', 'März': '03', 'April': '04',
    'Mai': '05', 'Juni': '06', 'Juli': '07', 'August': '08',
    'September': '09', 'Oktober': '10', 'November': '11', 'Dezember': '12'
  }
  
  const day = parts[0].replace('.', '').padStart(2, '0')
  const month = months[parts[1]]
  const year = parts[2]
  
  return month ? `${year}-${month}-${day}` : null
}

const generateTags = (goal) => {
  const tags = []
  
  // Jahr-Tags
  if (goal.deadline?.includes('2025')) tags.push('2025')
  if (goal.deadline?.includes('2026')) tags.push('2026')
  if (goal.deadline?.includes('2027')) tags.push('2027')
  if (goal.deadline?.includes('2030')) tags.push('2030')
  
  // Kategorie-Tags
  if (goal.category.includes('Tech')) tags.push('tech')
  if (goal.category.includes('Reisen')) tags.push('travel')
  if (goal.category.includes('Kreativ')) tags.push('creative')
  if (goal.category.includes('Lernen')) tags.push('learning')
  if (goal.category.includes('Persönliche')) tags.push('personal')
  
  // Status-Tags
  if (goal.status === 'Abgeschlossen') tags.push('completed')
  if (goal.priority === 'Hoch') tags.push('priority')
  
  // Content-Tags
  if (goal.title.toLowerCase().includes('youtube')) tags.push('youtube')
  if (goal.title.toLowerCase().includes('website')) tags.push('website')
  if (goal.title.toLowerCase().includes('japan')) tags.push('japan')
  if (goal.title.toLowerCase().includes('fitness') || goal.title.toLowerCase().includes('bankdrücken')) tags.push('fitness')
  
  return tags.length > 0 ? tags : ['general']
}

// MAIN MIGRATION
async function runFullMigration() {
  try {
    console.log(`📋 Processing ${ALL_GOALS.length} goals...`)
    
    // Check if goals already exist (avoid duplicates)
    const existing = await goalHelpers.getGoals()
    if (existing.success && existing.count > 3) {
      console.log(`⚠️  Found ${existing.count} existing goals. Clearing for fresh migration...`)
      
      // Clear existing (keep it clean)
      const { error: clearError } = await supabase
        .from('goals')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000')
      
      if (clearError) {
        console.warn('⚠️  Could not clear existing goals:', clearError.message)
      } else {
        console.log('✅ Database cleared')
      }
    }
    
    // Transform all goals
    console.log('🔄 Transforming goals...')
    const transformedGoals = ALL_GOALS.map((goal, index) => {
      if (index < 5 || index % 10 === 0) {
        console.log(`   ${index + 1}/50: ${goal.title}`)
      }
      
      return {
        title: goal.title,
        description: getDescription(goal),
        status: transformStatus(goal.status),
        priority: transformPriority(goal.priority),
        category: goal.category,
        progress: goal.progress,
        deadline: transformDeadline(goal.deadline),
        tags: generateTags(goal),
        resources: {
          legacy_id: goal.id,
          migrated_at: new Date().toISOString(),
          original_data: {
            status: goal.status,
            priority: goal.priority,
            deadline: goal.deadline
          }
        },
        is_public: true,
        // Set completion date for completed goals
        ...(goal.status === 'Abgeschlossen' && {
          completion_date: new Date().toISOString().split('T')[0]
        })
      }
    })
    
    console.log('✅ All goals transformed')
    console.log('📥 Inserting into database...')
    
    // Batch insert (Supabase can handle 50 goals at once)
    const { data, error } = await supabase
      .from('goals')
      .insert(transformedGoals)
      .select()
    
    if (error) {
      console.error('❌ Database insert failed:', error)
      throw error
    }
    
    console.log('🎉 MIGRATION SUCCESSFUL!')
    console.log(`✅ Inserted ${data.length} goals`)
    
    // Statistics
    const stats = {
      total: data.length,
      completed: data.filter(g => g.status === 'completed').length,
      in_progress: data.filter(g => g.status === 'in_progress').length,
      planned: data.filter(g => g.status === 'planned').length,
      avgProgress: Math.round(data.reduce((sum, g) => sum + g.progress, 0) / data.length)
    }
    
    console.log('\n📊 Migration Statistics:')
    console.log(`   • Total Goals: ${stats.total}`)
    console.log(`   • Completed: ${stats.completed}`)
    console.log(`   • In Progress: ${stats.in_progress}`)
    console.log(`   • Planned: ${stats.planned}`)
    console.log(`   • Average Progress: ${stats.avgProgress}%`)
    
    // Show sample of migrated goals
    console.log('\n📋 Sample migrated goals:')
    data.slice(0, 5).forEach((goal, index) => {
      console.log(`   ${index + 1}. ${goal.title}`)
      console.log(`      Status: ${goal.status} | Progress: ${goal.progress}% | Category: ${goal.category}`)
    })
    
    // Final verification
    console.log('\n🔍 Final verification...')
    const verification = await goalHelpers.getGoals()
    console.log(`📊 Total goals in database: ${verification.count}`)
    
    console.log('\n🚀 Next Steps:')
    console.log('   1. Update App.jsx to load goals from API')
    console.log('   2. Test frontend with new database')
    console.log('   3. Deploy updated website')
    
    return { success: true, stats }
    
  } catch (error) {
    console.error('\n💥 Migration failed!')
    console.error('Error:', error.message)
    return { success: false, error }
  }
}

// RUN FULL MIGRATION
console.log('🔄 Starting FULL migration...')
runFullMigration()
  .then(result => {
    if (result.success) {
      console.log('\n🎉 FULL MIGRATION COMPLETED SUCCESSFULLY!')
    } else {
      console.log('\n❌ Migration failed')
    }
  })
  .catch(error => {
    console.error('\n💥 Unexpected error:', error)
  })