import { useEffect } from 'react'

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

// Nur in Production tracken
const isDevelopment = import.meta.env.DEV

export const useAnalytics = () => {
  useEffect(() => {
    if (isDevelopment || !GA_MEASUREMENT_ID) {
      console.log('Analytics disabled in development mode')
      return
    }
    
    // Google Analytics Script laden
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    // gtag Funktion initialisieren
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      // Privacy-respecting settings
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
      cookie_expires: 60 * 60 * 24 * 30, // 30 Tage
    })

    return () => {
      // Cleanup beim Unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  // Base Event Tracking
  const trackEvent = (eventName, eventParams = {}) => {
    if (isDevelopment || !window.gtag) {
      console.log('Analytics Event:', eventName, eventParams)
      return
    }
    
    window.gtag('event', eventName, eventParams)
  }

  // ========================================
  // BERGKABUFF-SPEZIFISCHE TRACKING EVENTS
  // ========================================

  // Goal-spezifische Events
  const trackGoalClick = (goalId, goalTitle) => {
    trackEvent('goal_click', {
      goal_id: goalId,
      goal_title: goalTitle,
      event_category: 'goal_engagement'
    })
  }

  const trackGoalCompletion = (goalId, goalTitle, category) => {
    trackEvent('goal_completed', {
      goal_id: goalId,
      goal_title: goalTitle,
      category: category,
      event_category: 'achievement'
    })
  }

  const trackProgressUpdate = (goalId, oldProgress, newProgress) => {
    trackEvent('progress_update', {
      goal_id: goalId,
      old_progress: oldProgress,
      new_progress: newProgress,
      progress_change: newProgress - oldProgress,
      event_category: 'goal_engagement'
    })
  }

  // Navigation & Filter Events
  const trackCategoryFilter = (category) => {
    trackEvent('category_filter', {
      category: category,
      event_category: 'navigation'
    })
  }

  const trackPriorityFilter = (priority) => {
    trackEvent('priority_filter', {
      priority: priority,
      event_category: 'navigation'
    })
  }

  const trackStatusFilter = (status) => {
    trackEvent('status_filter', {
      status: status,
      event_category: 'navigation'
    })
  }

  // Search Events
  const trackSearch = (searchTerm) => {
    trackEvent('search', {
      search_term: searchTerm,
      search_length: searchTerm.length,
      event_category: 'engagement'
    })
  }

  const trackSearchResults = (searchTerm, resultCount) => {
    trackEvent('search_results', {
      search_term: searchTerm,
      result_count: resultCount,
      event_category: 'engagement'
    })
  }

  // Modal & UI Events
  const trackModalOpen = (modalType) => {
    trackEvent('modal_open', {
      modal_type: modalType,
      event_category: 'ui_interaction'
    })
  }

  const trackModalClose = (modalType, timeSpent = null) => {
    const params = {
      modal_type: modalType,
      event_category: 'ui_interaction'
    }
    
    if (timeSpent) {
      params.time_spent_seconds = timeSpent
    }
    
    trackEvent('modal_close', params)
  }

  // Video & Media Events
  const trackVideoWatch = (videoId, videoTitle = '') => {
    trackEvent('video_watch', {
      video_id: videoId,
      video_title: videoTitle,
      event_category: 'media_engagement'
    })
  }

  const trackVideoComplete = (videoId, watchDuration) => {
    trackEvent('video_complete', {
      video_id: videoId,
      watch_duration_seconds: watchDuration,
      event_category: 'media_engagement'
    })
  }

  // External Links & Social
  const trackExternalLink = (url, linkType) => {
    trackEvent('external_link_click', {
      link_url: url,
      link_type: linkType,
      event_category: 'external_engagement'
    })
  }

  const trackSocialShare = (platform, goalId = null, shareType = 'general') => {
    const params = {
      platform: platform,
      share_type: shareType,
      event_category: 'social_sharing'
    }
    
    if (goalId) {
      params.goal_id = goalId
    }
    
    trackEvent('social_share', params)
  }

  // Newsletter & Community
  const trackNewsletterSignup = (source = 'unknown') => {
    trackEvent('newsletter_signup', {
      signup_source: source,
      event_category: 'conversion'
    })
  }

  const trackCommunityJoin = (platform) => {
    trackEvent('community_join', {
      platform: platform,
      event_category: 'conversion'
    })
  }

  // Page Performance & User Behavior
  const trackPageLoad = (loadTime) => {
    trackEvent('page_load_time', {
      load_time_ms: loadTime,
      event_category: 'performance'
    })
  }

  const trackScrollDepth = (scrollPercent) => {
    // Nur bei 25%, 50%, 75%, 100% tracken
    if ([25, 50, 75, 100].includes(scrollPercent)) {
      trackEvent('scroll_depth', {
        scroll_percent: scrollPercent,
        event_category: 'engagement'
      })
    }
  }

  const trackTimeOnSite = (timeSpent) => {
    trackEvent('time_on_site', {
      time_spent_seconds: timeSpent,
      event_category: 'engagement'
    })
  }

  // Error Tracking
  const trackError = (errorType, errorMessage, errorSource = 'unknown') => {
    trackEvent('error_occurred', {
      error_type: errorType,
      error_message: errorMessage,
      error_source: errorSource,
      event_category: 'errors'
    })
  }

  // ========================================
  // ADVANCED TRACKING FUNKTIONEN
  // ========================================

  // User Journey Tracking
  const trackUserJourney = (step, stepData = {}) => {
    trackEvent('user_journey', {
      journey_step: step,
      ...stepData,
      event_category: 'user_flow'
    })
  }

  // A/B Test Tracking (für später)
  const trackABTest = (testName, variant, interaction = 'view') => {
    trackEvent('ab_test', {
      test_name: testName,
      variant: variant,
      interaction: interaction,
      event_category: 'ab_testing'
    })
  }

  // Custom Conversion Events
  const trackConversion = (conversionType, value = null, goalId = null) => {
    const params = {
      conversion_type: conversionType,
      event_category: 'conversions'
    }
    
    if (value) params.conversion_value = value
    if (goalId) params.goal_id = goalId
    
    trackEvent('conversion', params)
  }

  // ========================================
  // UTILITY FUNKTIONEN
  // ========================================

  // Session-basierte Events
  const trackSessionStart = () => {
    trackEvent('session_start', {
      session_timestamp: Date.now(),
      event_category: 'session'
    })
  }

  const trackSessionEnd = (sessionDuration) => {
    trackEvent('session_end', {
      session_duration_seconds: sessionDuration,
      event_category: 'session'
    })
  }

  // Device & Browser Info
  const trackDeviceInfo = () => {
    const deviceInfo = {
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      user_agent: navigator.userAgent,
      event_category: 'device_info'
    }
    
    trackEvent('device_info', deviceInfo)
  }

  // ========================================
  // RETURN ALLE FUNKTIONEN
  // ========================================

  return {
    // Base Functions
    trackEvent,
    
    // Goal-specific Events
    trackGoalClick,
    trackGoalCompletion,
    trackProgressUpdate,
    
    // Navigation Events
    trackCategoryFilter,
    trackPriorityFilter,
    trackStatusFilter,
    
    // Search Events
    trackSearch,
    trackSearchResults,
    
    // UI Events
    trackModalOpen,
    trackModalClose,
    
    // Media Events
    trackVideoWatch,
    trackVideoComplete,
    
    // External & Social Events
    trackExternalLink,
    trackSocialShare,
    
    // Conversion Events
    trackNewsletterSignup,
    trackCommunityJoin,
    trackConversion,
    
    // Performance Events
    trackPageLoad,
    trackScrollDepth,
    trackTimeOnSite,
    
    // Error & Journey Events
    trackError,
    trackUserJourney,
    trackABTest,
    
    // Session Events
    trackSessionStart,
    trackSessionEnd,
    trackDeviceInfo
  }
}