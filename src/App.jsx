import "./App.css";
import { useState, useEffect } from "react";
import { goalHelpers } from "../lib/goalHelpers";
import { notionSync } from "../lib/notionSync";
import CookieBanner from "./components/Legal/CookieBanner";
import LegalPages from "./components/Legal/LegalPages";

// CSS Reset für Browser-Standards
const globalStyles = `
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;

// Style-Tag in den Head einfügen
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = globalStyles;
  document.head.appendChild(styleSheet);
}

// YouTube Modal Component
const YouTubeModal = ({ isOpen, onClose, videoId = "dQw4w9WgXcQ" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: window.innerWidth > 768 ? "20px" : "10px",
        overflow: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "18px",
          maxWidth: window.innerWidth > 768 ? "900px" : "95vw",
          width: "100%",
          maxHeight: window.innerWidth > 768 ? "90vh" : "95vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: window.innerWidth > 768 ? "24px" : "16px",
            borderBottom: "1px solid #d2d2d7",
            flexShrink: 0,
          }}
        >
          <h3
            style={{
              fontSize: window.innerWidth > 768 ? "20px" : "18px",
              fontWeight: "600",
              margin: 0,
              color: "#1d1d1f",
              paddingRight: "20px",
            }}
          >
            {window.innerWidth > 480
              ? "Das Bergkabuff Projekt - Meine Story"
              : "Bergkabuff Story"}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "28px",
              color: "#86868b",
              cursor: "pointer",
              padding: "4px",
              minWidth: "32px",
              minHeight: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>

        <div
          style={{
            padding: window.innerWidth > 768 ? "24px" : "16px",
            overflow: "auto",
            flex: 1,
          }}
        >
          {videoId === "dQw4w9WgXcQ" ? (
            <div
              style={{
                aspectRatio: "16/9",
                backgroundColor: "#f5f5f7",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
                padding: window.innerWidth > 768 ? "40px" : "20px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  fontSize: window.innerWidth > 768 ? "48px" : "36px",
                  marginBottom: "16px",
                }}
              >
                🎬
              </div>
              <h4
                style={{
                  fontSize: window.innerWidth > 768 ? "24px" : "20px",
                  fontWeight: "600",
                  color: "#1d1d1f",
                  marginBottom: "8px",
                }}
              >
                Video kommt bald!
              </h4>
              <p
                style={{
                  color: "#86868b",
                  marginBottom: "24px",
                  lineHeight: "1.4",
                  fontSize: window.innerWidth > 768 ? "16px" : "14px",
                }}
              >
                Das erste Bergkabuff-Video ist gerade in Produktion.
                <br />
                Hier wird es eingebettet, sobald es auf YouTube live ist.
              </p>

              <a
                href="https://youtube.com/@bergkabuff"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#ff3b30",
                  color: "white",
                  padding: window.innerWidth > 768 ? "12px 24px" : "14px 20px",
                  borderRadius: "22px",
                  textDecoration: "none",
                  fontSize: window.innerWidth > 768 ? "14px" : "16px",
                  fontWeight: "500",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  minHeight: "44px",
                  justifyContent: "center",
                }}
              >
                📺 YouTube-Kanal besuchen
              </a>
            </div>
          ) : (
            <div
              style={{
                aspectRatio: "16/9",
                marginBottom: "20px",
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Bergkabuff Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: "12px" }}
              />
            </div>
          )}

          <div>
            <h4
              style={{
                fontSize: window.innerWidth > 768 ? "16px" : "15px",
                fontWeight: "600",
                color: "#1d1d1f",
                marginBottom: "12px",
              }}
            >
              Was dich im ersten Video erwartet:
            </h4>
            <ul
              style={{
                color: "#86868b",
                fontSize: window.innerWidth > 768 ? "14px" : "13px",
                lineHeight: "1.6",
                paddingLeft: "20px",
                marginBottom: "16px",
              }}
            >
              <li>Warum das Bergkabuff-Projekt entstanden ist</li>
              <li>Live-Demo dieser Website</li>
              <li>Einblick in meine {goals?.length || 50} Lebensziele</li>
              <li>Ausblick auf kommende Projekte</li>
              <li>Wie du Teil der Community werden kannst</li>
            </ul>

            <div
              style={{
                backgroundColor: "#007aff",
                color: "white",
                padding: window.innerWidth > 768 ? "16px" : "14px",
                borderRadius: "12px",
                fontSize: window.innerWidth > 768 ? "14px" : "13px",
                lineHeight: "1.5",
              }}
            >
              <strong>💡 Tipp:</strong> Abonniere den Kanal, um kein Update zu
              verpassen! Jedes neue Ziel wird mit einem eigenen Video
              dokumentiert.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Sync Button Component
const SyncButton = ({ onSync, syncing, lastSync }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "8px",
      }}
    >
      {lastSync && (
        <div
          style={{
            fontSize: "11px",
            color: "#86868b",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "4px 8px",
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
            border: "1px solid #d2d2d7",
          }}
        >
          Letzter Sync: {lastSync.toLocaleTimeString()}
        </div>
      )}

      <button
        onClick={onSync}
        disabled={syncing}
        style={{
          backgroundColor: syncing ? "#86868b" : "#0071e3",
          color: "#ffffff",
          border: "none",
          borderRadius: "25px",
          padding: "12px 20px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: syncing ? "not-allowed" : "pointer",
          outline: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 4px 14px rgba(0, 113, 227, 0.15)",
          transition: "all 0.2s ease",
        }}
      >
        <span
          style={{
            animation: syncing ? "spin 1s linear infinite" : "none",
            display: "inline-block",
          }}
        >
          🔄
        </span>
        {syncing ? "Syncronisiere..." : "Sync mit Notion"}
      </button>
    </div>
  );
};

// Enhanced Tag Component
const TagList = ({ tags, maxVisible = 3 }) => {
  if (!tags || !Array.isArray(tags) || tags.length === 0) return null;

  const visibleTags = tags.slice(0, maxVisible);
  const hiddenCount = tags.length - maxVisible;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "4px",
        marginTop: "8px",
      }}
    >
      {visibleTags.map((tag, index) => (
        <span
          key={index}
          style={{
            fontSize: "10px",
            padding: "2px 6px",
            backgroundColor: "#007aff",
            color: "#ffffff",
            borderRadius: "4px",
            fontWeight: "500",
          }}
        >
          {tag}
        </span>
      ))}
      {hiddenCount > 0 && (
        <span
          style={{
            fontSize: "10px",
            padding: "2px 6px",
            backgroundColor: "#f5f5f7",
            color: "#86868b",
            borderRadius: "4px",
            fontWeight: "500",
          }}
        >
          +{hiddenCount}
        </span>
      )}
    </div>
  );
};

function App() {
  // State Management
  const [goals, setGoals] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showYouTubeModal, setShowYouTubeModal] = useState(false);
  const [showLegalPage, setShowLegalPage] = useState(null);

  // Sync State
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [selectedPriority, setSelectedPriority] = useState("Alle Prioritäten");
  const [selectedStatus, setSelectedStatus] = useState("Alle Status");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);

  // Dynamic Filter Options
  const [categories, setCategories] = useState(["Alle"]);
  const priorities = ["Alle Prioritäten", "high", "medium", "low"];
  const statuses = ["Alle Status", "completed", "in_progress", "planned"];

  // Load Goals from Supabase - Enhanced with all fields
  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      setLoading(true);

      // Enhanced query to load all available fields
      const data = await goalHelpers.getGoalsEnhanced();

      if (data && Array.isArray(data)) {
        // Sort by priority and then by created_at
        const sortedGoals = data.sort((a, b) => {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          const priorityDiff =
            (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);

          if (priorityDiff !== 0) return priorityDiff;

          return new Date(b.created_at) - new Date(a.created_at);
        });

        setGoals(sortedGoals);

        // Extract unique categories
        const uniqueCategories = [
          "Alle",
          ...new Set(sortedGoals.map((goal) => goal.category).filter(Boolean)),
        ];
        setCategories(uniqueCategories);

        console.log(
          `✅ Loaded ${sortedGoals.length} goals from database with enhanced schema`
        );
        console.log("Sample goal structure:", sortedGoals[0]);
      } else {
        console.warn("No goals data received");
        setGoals([]);
      }
    } catch (err) {
      console.error("Error loading goals:", err);
      setError("Fehler beim Laden der Ziele. Bitte versuche es erneut.");
      setGoals([]);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced Sync with Notion
  const handleNotionSync = async () => {
    try {
      setSyncing(true);
      console.log("🔄 Starting Notion sync...");

      // Use client-side sync
      const result = await notionSync.syncFromNotion();

      if (result.success) {
        // Reload goals after sync to get fresh data
        await loadGoals();
        setLastSync(new Date());

        // Show success message in console
        console.log(`✅ Sync successful!`);
        console.log(`📊 Stats:`, {
          synced: result.synced,
          created: result.created,
          updated: result.updated,
          notion_linked: result.notion_linked,
          simulation: result.simulation,
        });

        // TODO: Add toast notification here later
        // toast.success(`✅ Sync completed: ${result.synced} goals processed`)
      } else {
        throw new Error(result.error || "Sync failed");
      }
    } catch (error) {
      console.error("❌ Sync error:", error.message);

      // TODO: Add toast error notification here later
      // toast.error(`❌ Sync failed: ${error.message}`)
    } finally {
      setSyncing(false);
    }
  };

  // Filter Goals whenever filters change - Enhanced
  useEffect(() => {
    if (!goals.length) {
      setFilteredGoals([]);
      return;
    }

    const filtered = goals.filter((goal) => {
      // Only show public goals
      if (goal.is_public === false) return false;

      const matchesCategory =
        selectedCategory === "Alle" || goal.category === selectedCategory;
      const matchesPriority =
        selectedPriority === "Alle Prioritäten" ||
        goal.priority === selectedPriority;
      const matchesStatus =
        selectedStatus === "Alle Status" || goal.status === selectedStatus;

      // Enhanced search: search in title, description, and tags
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        goal.title?.toLowerCase().includes(searchLower) ||
        goal.description?.toLowerCase().includes(searchLower) ||
        (goal.tags &&
          goal.tags.some((tag) => tag.toLowerCase().includes(searchLower)));

      return (
        matchesCategory && matchesPriority && matchesStatus && matchesSearch
      );
    });

    setFilteredGoals(filtered);
  }, [goals, selectedCategory, selectedPriority, selectedStatus, searchTerm]);

  // Enhanced Goal Description
  const getGoalDescription = (goal) => {
    if (goal.description && goal.description.trim()) {
      return goal.description;
    }

    return "Eine detaillierte Beschreibung folgt bald...";
  };

  // Enhanced Statistics calculation
  const calculateStats = () => {
    if (!goals.length) {
      return {
        total: 0,
        completed: 0,
        inProgress: 0,
        planned: 0,
        averageProgress: 0,
        publicGoals: 0,
      };
    }

    const publicGoals = goals.filter((g) => g.is_public !== false);
    const completed = publicGoals.filter(
      (g) => g.status === "completed"
    ).length;
    const inProgress = publicGoals.filter(
      (g) => g.status === "in_progress"
    ).length;
    const planned = publicGoals.filter((g) => g.status === "planned").length;
    const totalProgress = publicGoals.reduce(
      (sum, g) => sum + (g.progress || 0),
      0
    );
    const averageProgress =
      publicGoals.length > 0
        ? Math.round(totalProgress / publicGoals.length)
        : 0;

    return {
      total: publicGoals.length,
      completed,
      inProgress,
      planned,
      averageProgress,
      publicGoals: publicGoals.length,
    };
  };

  const stats = calculateStats();

  // Display Mappings (same as before)
  const getStatusDisplay = (status) => {
    const statusMap = {
      completed: "Abgeschlossen",
      in_progress: "In Arbeit",
      planned: "Geplant",
      paused: "Pausiert",
      cancelled: "Abgebrochen",
    };
    return statusMap[status] || status;
  };

  const getPriorityDisplay = (priority) => {
    const priorityMap = {
      high: "Hoch",
      medium: "Mittel",
      low: "Niedrig",
    };
    return priorityMap[priority] || priority;
  };

  const getPriorityColor = (priority) => {
    const colorMap = {
      high: "#ff3b30",
      medium: "#ff9500",
      low: "#8e8e93",
    };
    return colorMap[priority] || "#8e8e93";
  };

  const getStatusColor = (status) => {
    const colorMap = {
      completed: "#34c759",
      in_progress: "#0071e3",
      planned: "#86868b",
      paused: "#ff9500",
      cancelled: "#8e8e93",
    };
    return colorMap[status] || "#86868b";
  };

  const getProgressColor = (progress, status) => {
    if (progress === 100 || status === "completed") return "#34c759";
    if (progress > 0) return "#0071e3";
    return "#d2d2d7";
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Alle");
    setSelectedPriority("Alle Prioritäten");
    setSelectedStatus("Alle Status");
  };

  // Loading State (same as before)
  if (loading) {
    return (
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: "#ffffff",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#1d1d1f",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #0071e3",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          />
          <p style={{ fontSize: "18px", color: "#86868b" }}>
            Lade deine Ziele...
          </p>
        </div>
      </div>
    );
  }

  // Error State (same as before)
  if (error) {
    return (
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: "#ffffff",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#1d1d1f",
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: "500px",
            padding: "40px",
            backgroundColor: "#f5f5f7",
            borderRadius: "18px",
            margin: "20px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#1d1d1f",
              margin: "0 0 8px 0",
            }}
          >
            Fehler beim Laden
          </h3>
          <p
            style={{ fontSize: "16px", color: "#86868b", margin: "0 0 24px 0" }}
          >
            {error}
          </p>
          <button
            onClick={loadGoals}
            style={{
              backgroundColor: "#0071e3",
              color: "#ffffff",
              border: "none",
              borderRadius: "20px",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              outline: "none",
            }}
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        color: "#1d1d1f",
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        width: "100vw",
      }}
    >
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* Header (same as before) */}
      <header
        style={{
          borderBottom: "1px solid #d2d2d7",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "1800px",
            margin: "0 auto",
            padding: "0 40px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "44px",
          }}
        >
          <h1
            style={{
              fontSize: "21px",
              fontWeight: "600",
              margin: 0,
              letterSpacing: "-0.022em",
            }}
          >
            Bergkabuff
          </h1>
          <nav style={{ display: "flex", gap: "32px" }}>
            <a
              href="#goals"
              style={{
                textDecoration: "none",
                color: "#1d1d1f",
                fontSize: "12px",
                fontWeight: "400",
                opacity: 0.8,
              }}
            >
              Goals
            </a>
            <a
              href="#about"
              style={{
                textDecoration: "none",
                color: "#1d1d1f",
                fontSize: "12px",
                fontWeight: "400",
                opacity: 0.8,
              }}
            >
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Hero - Enhanced with sync info */}
      <section
        style={{
          textAlign: "center",
          padding: "94px 40px 80px",
          maxWidth: "1800px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <button
          onClick={() => setShowYouTubeModal(true)}
          style={{
            backgroundColor: "#ff3b30",
            color: "#ffffff",
            border: "none",
            borderRadius: "20px",
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            marginBottom: "40px",
          }}
        >
          📺 Meine Story ansehen
        </button>

        <h1
          style={{
            fontSize: "56px",
            lineHeight: "1.07143",
            fontWeight: "600",
            letterSpacing: "-0.005em",
            margin: "0 0 6px",
            color: "#1d1d1f",
          }}
        >
          Making Dreams Reality
        </h1>
        <p
          style={{
            fontSize: "28px",
            lineHeight: "1.14286",
            fontWeight: "400",
            letterSpacing: "0.007em",
            margin: "0 0 40px",
            color: "#86868b",
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {stats.total} Lebensziele. Öffentlich geplant. Systematisch umgesetzt.
        </p>

        {/* Enhanced Statistics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "20px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "32px", fontWeight: "600", color: "#34c759" }}
            >
              {stats.completed}
            </div>
            <div style={{ fontSize: "14px", color: "#86868b" }}>
              Abgeschlossen
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "32px", fontWeight: "600", color: "#0071e3" }}
            >
              {stats.inProgress}
            </div>
            <div style={{ fontSize: "14px", color: "#86868b" }}>In Arbeit</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "32px", fontWeight: "600", color: "#86868b" }}
            >
              {stats.planned}
            </div>
            <div style={{ fontSize: "14px", color: "#86868b" }}>Geplant</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "32px", fontWeight: "600", color: "#ff9500" }}
            >
              {stats.averageProgress}%
            </div>
            <div style={{ fontSize: "14px", color: "#86868b" }}>
              Ø Fortschritt
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section - All filtering and display logic remains the same */}
      <section
        id="goals"
        style={{
          maxWidth: "1800px",
          margin: "0 auto",
          padding: "0 40px 80px",
          width: "100%",
        }}
      >
        {/* Search Bar - Enhanced with placeholder */}
        <div
          style={{
            maxWidth: "480px",
            margin: "0 auto 40px",
            position: "relative",
          }}
        >
          <input
            type="text"
            placeholder="Durchsuche Ziele, Beschreibungen & Tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              height: "44px",
              border: "1px solid #d2d2d7",
              borderRadius: "22px",
              padding: "0 44px 0 16px",
              fontSize: "17px",
              backgroundColor: "#ffffff",
              color: "#1d1d1f",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Filter Kategorie */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 16px",
                border:
                  selectedCategory === cat
                    ? "1px solid #86868b"
                    : "1px solid #d2d2d7",
                borderRadius: "20px",
                backgroundColor:
                  selectedCategory === cat ? "#86868b" : "#ffffff",
                color: selectedCategory === cat ? "#ffffff" : "#1d1d1f",
                fontSize: "14px",
                fontWeight: "400",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Priorität & Status */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {priorities.map((prio) => {
              const displayPrio =
                prio === "Alle Prioritäten" ? prio : getPriorityDisplay(prio);
              return (
                <button
                  key={prio}
                  onClick={() => setSelectedPriority(prio)}
                  style={{
                    padding: "6px 12px",
                    border:
                      selectedPriority === prio
                        ? "1px solid #86868b"
                        : "1px solid #d2d2d7",
                    borderRadius: "16px",
                    backgroundColor:
                      selectedPriority === prio ? "#86868b" : "#ffffff",
                    color: selectedPriority === prio ? "#ffffff" : "#1d1d1f",
                    fontSize: "12px",
                    fontWeight: "400",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  {displayPrio}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {statuses.map((status) => {
              const displayStatus =
                status === "Alle Status" ? status : getStatusDisplay(status);
              return (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  style={{
                    padding: "6px 12px",
                    border:
                      selectedStatus === status
                        ? "1px solid #86868b"
                        : "1px solid #d2d2d7",
                    borderRadius: "16px",
                    backgroundColor:
                      selectedStatus === status ? "#86868b" : "#ffffff",
                    color: selectedStatus === status ? "#ffffff" : "#1d1d1f",
                    fontSize: "12px",
                    fontWeight: "400",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  {displayStatus}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={{ fontSize: "16px", color: "#86868b" }}>
            {filteredGoals.length} von {goals.length} Zielen
            {searchTerm && (
              <span style={{ fontWeight: "500", color: "#1d1d1f" }}>
                {" "}
                für "{searchTerm}"
              </span>
            )}
          </p>
        </div>

        {/* Enhanced Goals Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 450px))",
            gap: "24px",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          {filteredGoals.map((goal) => {
            const isExpanded = expandedCard === goal.id;
            const statusColor = getStatusColor(goal.status);
            const priorityColor = getPriorityColor(goal.priority);
            const progressColor = getProgressColor(goal.progress, goal.status);

            return (
              <div
                key={goal.id}
                style={{
                  border: "1px solid #d2d2d7",
                  borderRadius: "18px",
                  padding: "24px",
                  backgroundColor: "#ffffff",
                  transition: "all 0.3s ease",
                  height: isExpanded ? "auto" : "240px",
                  minHeight: "240px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                }}
                onClick={() => setExpandedCard(isExpanded ? null : goal.id)}
              >
                {/* Notion Sync Indicator */}
                {goal.notion_page_id && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#34c759",
                      borderRadius: "50%",
                      title: "Synced with Notion",
                    }}
                  />
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "19px",
                      fontWeight: "600",
                      letterSpacing: "-0.022em",
                      margin: 0,
                      color: "#1d1d1f",
                      lineHeight: "1.21053",
                      flex: 1,
                      paddingRight: "12px",
                    }}
                  >
                    {goal.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      alignItems: "flex-end",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "3px 8px",
                        backgroundColor: "#f5f5f7",
                        borderRadius: "8px",
                        color: "#86868b",
                        fontWeight: "500",
                      }}
                    >
                      {goal.category}
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        padding: "2px 6px",
                        backgroundColor: priorityColor,
                        color: "#ffffff",
                        borderRadius: "6px",
                        fontWeight: "500",
                      }}
                    >
                      {getPriorityDisplay(goal.priority)}
                    </span>
                  </div>
                </div>

                {/* Enhanced Description Preview */}
                {!isExpanded && goal.description && (
                  <div style={{ marginBottom: "12px" }}>
                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: "1.4",
                        color: "#86868b",
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {goal.description}
                    </p>
                  </div>
                )}

                {/* Tags Preview */}
                {!isExpanded && <TagList tags={goal.tags} maxVisible={3} />}

                <div style={{ marginBottom: "12px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        color: statusColor,
                      }}
                    >
                      {getStatusDisplay(goal.status)}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#86868b",
                        fontWeight: "600",
                      }}
                    >
                      {goal.progress || 0}%
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "4px",
                      backgroundColor: "#f5f5f7",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${goal.progress || 0}%`,
                        height: "100%",
                        backgroundColor: progressColor,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>

                {!isExpanded ? (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#86868b",
                      textAlign: "center",
                      paddingTop: "8px",
                      borderTop: "1px solid #f5f5f7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <span>{goal.deadline || "Kein Deadline"}</span>
                    <span
                      style={{
                        color: "#0071e3",
                        fontSize: "11px",
                        fontWeight: "500",
                      }}
                    >
                      Mehr erfahren ▶
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      paddingTop: "16px",
                      borderTop: "1px solid #f5f5f7",
                      animation: "fadeIn 0.3s ease",
                    }}
                  >
                    <div style={{ marginBottom: "16px" }}>
                      <h4
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#1d1d1f",
                          margin: "0 0 8px 0",
                        }}
                      >
                        Beschreibung
                      </h4>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "1.4",
                          color: "#86868b",
                          margin: 0,
                        }}
                      >
                        {getGoalDescription(goal)}
                      </p>
                    </div>

                    {/* Enhanced Details in Expanded View */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                        marginBottom: "16px",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#86868b",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Status
                        </span>
                        <div
                          style={{
                            fontSize: "13px",
                            color: statusColor,
                            fontWeight: "500",
                          }}
                        >
                          {getStatusDisplay(goal.status)}
                        </div>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#86868b",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Deadline
                        </span>
                        <div
                          style={{
                            fontSize: "13px",
                            color: "#1d1d1f",
                            fontWeight: "500",
                          }}
                        >
                          {goal.deadline || "Flexibel"}
                        </div>
                      </div>
                    </div>

                    {/* All Tags in Expanded View */}
                    {goal.tags && goal.tags.length > 0 && (
                      <div style={{ marginBottom: "16px" }}>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#86868b",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            display: "block",
                            marginBottom: "8px",
                          }}
                        >
                          Tags
                        </span>
                        <TagList tags={goal.tags} maxVisible={10} />
                      </div>
                    )}

                    {/* Resources Links */}
                    {goal.resources &&
                      goal.resources.links &&
                      goal.resources.links.length > 0 && (
                        <div style={{ marginBottom: "16px" }}>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: "600",
                              color: "#86868b",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                              display: "block",
                              marginBottom: "8px",
                            }}
                          >
                            Ressourcen
                          </span>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "4px",
                            }}
                          >
                            {goal.resources.links
                              .slice(0, 3)
                              .map((link, index) => (
                                <a
                                  key={index}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    fontSize: "11px",
                                    padding: "4px 8px",
                                    backgroundColor: "#007aff",
                                    color: "#ffffff",
                                    borderRadius: "6px",
                                    textDecoration: "none",
                                    fontWeight: "500",
                                  }}
                                >
                                  🔗 {link.title || "Link"}
                                </a>
                              ))}
                          </div>
                        </div>
                      )}

                    <div
                      style={{
                        textAlign: "center",
                        paddingTop: "12px",
                        borderTop: "1px solid #f5f5f7",
                      }}
                    >
                      <span
                        style={{
                          color: "#0071e3",
                          fontSize: "11px",
                          fontWeight: "500",
                        }}
                      >
                        Weniger anzeigen ▼
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* No Results State */}
        {filteredGoals.length === 0 && goals.length > 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              backgroundColor: "#f5f5f7",
              borderRadius: "18px",
              margin: "40px auto",
              maxWidth: "500px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🤔</div>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#1d1d1f",
                margin: "0 0 8px 0",
              }}
            >
              Keine Ziele gefunden
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#86868b",
                margin: "0 0 24px 0",
              }}
            >
              Versuche einen anderen Suchbegriff oder ändere die Filter.
            </p>
            <button
              onClick={clearAllFilters}
              style={{
                backgroundColor: "#86868b",
                color: "#ffffff",
                border: "none",
                borderRadius: "20px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                outline: "none",
              }}
            >
              Alle Ziele anzeigen
            </button>
          </div>
        )}

        {/* Empty State - No Goals at all */}
        {goals.length === 0 && !loading && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              backgroundColor: "#f5f5f7",
              borderRadius: "18px",
              margin: "40px auto",
              maxWidth: "500px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎯</div>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#1d1d1f",
                margin: "0 0 8px 0",
              }}
            >
              Noch keine Ziele vorhanden
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#86868b",
                margin: "0 0 24px 0",
              }}
            >
              Füge dein erstes Ziel hinzu und starte deine Reise!
            </p>
            <button
              onClick={loadGoals}
              style={{
                backgroundColor: "#0071e3",
                color: "#ffffff",
                border: "none",
                borderRadius: "20px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                outline: "none",
              }}
            >
              Daten neu laden
            </button>
          </div>
        )}

        {/* Enhanced Live Data Indicator */}
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            padding: "20px",
            backgroundColor: "#f5f5f7",
            borderRadius: "12px",
            maxWidth: "600px",
            margin: "40px auto 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#34c759",
                borderRadius: "50%",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#34c759",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Live Database
            </span>
            {lastSync && (
              <>
                <span style={{ color: "#86868b", fontSize: "12px" }}>•</span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#86868b",
                  }}
                >
                  Letzter Sync: {lastSync.toLocaleTimeString()}
                </span>
              </>
            )}
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "#86868b",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Daten werden live aus der Supabase-Datenbank geladen.
            {goals.filter((g) => g.notion_page_id).length > 0 && (
              <>
                {" "}
                {goals.filter((g) => g.notion_page_id).length} Ziele sind mit
                Notion synchronisiert.
              </>
            )}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #d2d2d7",
          padding: "40px 22px",
          textAlign: "center",
        }}
      >
        {/* NEU: Rechtliche Links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setShowLegalPage("impressum")}
            style={{
              background: "none",
              border: "none",
              color: "#86868b",
              fontSize: "12px",
              textDecoration: "none",
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#007aff")}
            onMouseLeave={(e) => (e.target.style.color = "#86868b")}
          >
            Impressum
          </button>
          <button
            onClick={() => setShowLegalPage("datenschutz")}
            style={{
              background: "none",
              border: "none",
              color: "#86868b",
              fontSize: "12px",
              textDecoration: "none",
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#007aff")}
            onMouseLeave={(e) => (e.target.style.color = "#86868b")}
          >
            Datenschutz
          </button>
          <button
            onClick={() => setShowLegalPage("cookies")}
            style={{
              background: "none",
              border: "none",
              color: "#86868b",
              fontSize: "12px",
              textDecoration: "none",
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#007aff")}
            onMouseLeave={(e) => (e.target.style.color = "#86868b")}
          >
            Cookies
          </button>
        </div>

        {/* Bestehender Footer Text */}
        <p
          style={{
            fontSize: "12px",
            color: "#86868b",
            margin: 0,
          }}
        >
          Made with passion and determination • Built with React + Supabase +
          Notion
        </p>
      </footer>

      {/* Enhanced Sync Button */}
      <SyncButton
        onSync={handleNotionSync}
        syncing={syncing}
        lastSync={lastSync}
      />

      {/* YouTube Modal */}
      <YouTubeModal
        isOpen={showYouTubeModal}
        onClose={() => setShowYouTubeModal(false)}
      />

      {/* NEU: Legal Pages Modal */}
      {showLegalPage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            overflow: "auto",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "18px",
              width: "100%",
              maxWidth: "900px",
              maxHeight: "90vh",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowLegalPage(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                color: "#86868b",
                border: "1px solid #d2d2d7",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                fontSize: "18px",
                cursor: "pointer",
                zIndex: 1001,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f5f5f7";
                e.target.style.color = "#1d1d1f";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                e.target.style.color = "#86868b";
              }}
              title="Schließen"
            >
              ×
            </button>

            {/* Legal Pages Content */}
            <div
              style={{
                flex: 1,
                overflow: "auto",
              }}
            >
              <LegalPages initialTab={showLegalPage} />
            </div>
          </div>
        </div>
      )}

      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
}

export default App;
