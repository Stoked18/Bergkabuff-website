import "./App.css";
import { useState } from "react";

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

// YouTube Modal Komponente
const YouTubeModal = ({ isOpen, onClose, videoId = "dQw4w9WgXcQ" }) => {
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
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "18px",
          maxWidth: "900px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "hidden",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px",
            borderBottom: "1px solid #d2d2d7",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              margin: 0,
              color: "#1d1d1f",
            }}
          >
            Das Bergkabuff Projekt - Meine Story
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              color: "#86868b",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            ×
          </button>
        </div>

        {/* Video Content */}
        <div style={{ padding: "24px" }}>
          {videoId === "dQw4w9WgXcQ" ? (
            // Placeholder für dein kommendes Video
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
                padding: "40px",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎬</div>
              <h4
                style={{
                  fontSize: "24px",
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
                }}
              >
                Das erste Bergkabuff-Video ist gerade in Produktion.
                <br />
                Hier wird es eingebettet, sobald es auf YouTube live ist.
              </p>

              {/* Vorschau: Einbettungscode */}
              <div
                style={{
                  backgroundColor: "#f5f5f7",
                  border: "2px dashed #d2d2d7",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "left",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  color: "#86868b",
                  marginBottom: "24px",
                }}
              >
                {`<iframe 
  width="100%" 
  height="100%"
  src="https://www.youtube.com/embed/DEINE_VIDEO_ID"
  title="Bergkabuff - Das Projekt startet"
  frameborder="0"
  allowfullscreen
></iframe>`}
              </div>

              <a
                href="https://youtube.com/@bergkabuff"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#ff3b30",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "22px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                📺 YouTube-Kanal besuchen
              </a>
            </div>
          ) : (
            // Echtes YouTube Video (wenn du eine Video-ID hast)
            <div style={{ aspectRatio: "16/9" }}>
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

          {/* Video Details */}
          <div style={{ marginTop: "24px" }}>
            <h4
              style={{
                fontSize: "16px",
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
                fontSize: "14px",
                lineHeight: "1.6",
                paddingLeft: "20px",
              }}
            >
              <li>Warum das Bergkabuff-Projekt entstanden ist</li>
              <li>Live-Demo dieser Website</li>
              <li>Einblick in meine 50 Lebensziele</li>
              <li>Ausblick auf kommende Projekte</li>
              <li>Wie du Teil der Community werden kannst</li>
            </ul>

            <div
              style={{
                backgroundColor: "#007aff",
                color: "white",
                padding: "16px",
                borderRadius: "12px",
                marginTop: "16px",
                fontSize: "14px",
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

// YouTube CTA Section
const YouTubeCTA = ({ onOpenVideo }) => (
  <section
    style={{
      backgroundColor: "#f5f5f7",
      padding: "80px 40px",
      textAlign: "center",
    }}
  >
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ fontSize: "64px", marginBottom: "24px" }}>📺</div>
      <h2
        style={{
          fontSize: "48px",
          fontWeight: "600",
          color: "#1d1d1f",
          marginBottom: "16px",
        }}
      >
        Folge der Journey auf YouTube
      </h2>
      <p
        style={{
          fontSize: "20px",
          color: "#86868b",
          marginBottom: "40px",
          lineHeight: "1.4",
          maxWidth: "600px",
          margin: "0 auto 40px",
        }}
      >
        Jedes Ziel wird dokumentiert. Jeder Erfolg wird gefeiert. Jeder
        Rückschlag wird zur Lernchance. Sei live dabei!
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <button
          onClick={onOpenVideo}
          style={{
            backgroundColor: "#ff3b30",
            color: "white",
            border: "none",
            borderRadius: "25px",
            padding: "16px 32px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          🎬 Erstes Video ansehen
        </button>

        <a
          href="https://youtube.com/@bergkabuff"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#007aff",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          → Kanal abonnieren
        </a>
      </div>
    </div>
  </section>
);

// Deine echten 50 Bucketlist-Ziele
const goals = [
  {
    id: 1,
    title: "Eine Website erstellen und veröffentlichen",
    status: "In Arbeit",
    priority: "Hoch",
    deadline: "31. Dezember 2025",
    progress: 85, // Erhöht, da du kurz vor Launch stehst!
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
  },
];

// Kategorien automatisch aus den Daten extrahieren
const categories = ["Alle", ...new Set(goals.map((goal) => goal.category))];
const priorities = ["Alle Prioritäten", "Hoch", "Mittel", "Niedrig"];
const statuses = ["Alle Status", "Abgeschlossen", "In Arbeit", "Geplant"];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [selectedPriority, setSelectedPriority] = useState("Alle Prioritäten");
  const [selectedStatus, setSelectedStatus] = useState("Alle Status");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [showYouTubeModal, setShowYouTubeModal] = useState(false); // NEU: YouTube Modal State

  // Beschreibungen für die Ziele hinzufügen
  const getGoalDescription = (id) => {
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
      12: "Traumreise nach Japan zur Kirschblütenzeit. Tokyo, Kyoto, Osaka erkunden und die Kultur vollständig erleben.",
    };
    return descriptions[id] || "Detaillierte Beschreibung folgt bald...";
  };

  const filteredGoals = goals.filter((goal) => {
    const matchesCategory =
      selectedCategory === "Alle" || goal.category === selectedCategory;
    const matchesPriority =
      selectedPriority === "Alle Prioritäten" ||
      goal.priority === selectedPriority;
    const matchesStatus =
      selectedStatus === "Alle Status" || goal.status === selectedStatus;
    const matchesSearch = goal.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesPriority && matchesStatus && matchesSearch;
  });

  // Statistiken berechnen
  const stats = {
    total: goals.length,
    completed: goals.filter((g) => g.status === "Abgeschlossen").length,
    inProgress: goals.filter((g) => g.status === "In Arbeit").length,
    planned: goals.filter((g) => g.status === "Geplant").length,
    averageProgress: Math.round(
      goals.reduce((sum, g) => sum + g.progress, 0) / goals.length
    ),
  };

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
      {/* Header */}
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
          <nav style={{ display: "flex", gap: "32px", alignItems: "center" }}>
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
            {/* NEU: YouTube Button im Header */}
            <button
              onClick={() => setShowYouTubeModal(true)}
              style={{
                backgroundColor: "#ff3b30",
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "8px 16px",
                fontSize: "12px",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              📺 YouTube
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          textAlign: "center",
          padding: "94px 40px 80px",
          maxWidth: "1800px",
          margin: "0 auto",
          width: "100%",
        }}
      >
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
          50 Lebensziele. Öffentlich geplant. Systematisch umgesetzt.
        </p>

        {/* Statistiken */}
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

      {/* Goals Section */}
      <section
        id="goals"
        style={{
          maxWidth: "1800px",
          margin: "0 auto",
          padding: "0 40px 80px",
          width: "100%",
        }}
      >
        {/* Search */}
        <div
          style={{
            maxWidth: "480px",
            margin: "0 auto 40px",
            position: "relative",
          }}
        >
          <input
            type="text"
            placeholder="Durchsuche deine Ziele..."
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
            {priorities.map((prio) => (
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
                {prio}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {statuses.map((status) => (
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
                {status}
              </button>
            ))}
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

        {/* Goals Grid */}
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
            return (
              <div
                key={goal.id}
                style={{
                  border: "1px solid #d2d2d7",
                  borderRadius: "18px",
                  padding: "24px",
                  backgroundColor: "#ffffff",
                  transition: "all 0.3s ease",
                  height: isExpanded ? "auto" : "200px",
                  minHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
                onClick={() => setExpandedCard(isExpanded ? null : goal.id)}
              >
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
                        backgroundColor:
                          goal.priority === "Hoch"
                            ? "#ff3b30"
                            : goal.priority === "Mittel"
                            ? "#ff9500"
                            : "#8e8e93",
                        color: "#ffffff",
                        borderRadius: "6px",
                        fontWeight: "500",
                      }}
                    >
                      {goal.priority}
                    </span>
                  </div>
                </div>

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
                        color:
                          goal.status === "Abgeschlossen"
                            ? "#34c759"
                            : goal.status === "In Arbeit"
                            ? "#0071e3"
                            : "#86868b",
                      }}
                    >
                      {goal.status}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#86868b",
                        fontWeight: "600",
                      }}
                    >
                      {goal.progress}%
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
                        width: `${goal.progress}%`,
                        height: "100%",
                        backgroundColor:
                          goal.progress === 100
                            ? "#34c759"
                            : goal.progress > 0
                            ? "#0071e3"
                            : "#d2d2d7",
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
                    <span>{goal.deadline}</span>
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
                        {getGoalDescription(goal.id)}
                      </p>
                    </div>

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
                            color:
                              goal.status === "Abgeschlossen"
                                ? "#34c759"
                                : goal.status === "In Arbeit"
                                ? "#0071e3"
                                : "#86868b",
                            fontWeight: "500",
                          }}
                        >
                          {goal.status}
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
                          {goal.deadline}
                        </div>
                      </div>
                    </div>

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

        {filteredGoals.length === 0 && (
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
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Alle");
                setSelectedPriority("Alle Prioritäten");
                setSelectedStatus("Alle Status");
              }}
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
      </section>

      {/* NEU: YouTube CTA Section - zwischen Goals und Footer eingefügt */}
      <YouTubeCTA onOpenVideo={() => setShowYouTubeModal(true)} />

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #d2d2d7",
          padding: "40px 22px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "#86868b",
            margin: 0,
          }}
        >
          Made with passion and determination
        </p>
      </footer>

      {/* NEU: YouTube Modal - am Ende eingefügt */}
      <YouTubeModal
        isOpen={showYouTubeModal}
        onClose={() => setShowYouTubeModal(false)}
        videoId="dQw4w9WgXcQ" // Später durch deine echte Video-ID ersetzen
      />
    </div>
  );
}

export default App;
