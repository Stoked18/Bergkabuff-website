import { useState, useEffect } from "react";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    youtube: false,
  });

  // Check if user has already made a choice
  useEffect(() => {
    const consent = localStorage.getItem("bergkabuff-cookie-consent");
    if (!consent) {
      // Show banner after a short delay to not annoy users immediately
      setTimeout(() => setShowBanner(true), 1500);
    } else {
      const savedSettings = JSON.parse(consent);
      setCookieSettings(savedSettings);
      // Initialize Google Analytics if consented
      if (savedSettings.analytics) {
        initializeGoogleAnalytics();
      }
    }
  }, []);

  const initializeGoogleAnalytics = () => {
    // Initialize Google Analytics (assuming you have the gtag script loaded)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
      console.log("✅ Google Analytics consent granted");
    }
  };

  const acceptAll = () => {
    const newSettings = {
      necessary: true,
      analytics: true,
      youtube: true,
      timestamp: new Date().toISOString(),
    };

    setCookieSettings(newSettings);
    localStorage.setItem(
      "bergkabuff-cookie-consent",
      JSON.stringify(newSettings)
    );
    setShowBanner(false);
    setShowSettings(false);

    // Initialize analytics
    initializeGoogleAnalytics();

    // Track consent decision
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "cookie_consent", {
        consent_type: "accept_all",
      });
    }
  };

  const acceptNecessary = () => {
    const newSettings = {
      necessary: true,
      analytics: false,
      youtube: false,
      timestamp: new Date().toISOString(),
    };

    setCookieSettings(newSettings);
    localStorage.setItem(
      "bergkabuff-cookie-consent",
      JSON.stringify(newSettings)
    );
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveCustomSettings = () => {
    const newSettings = {
      ...cookieSettings,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(
      "bergkabuff-cookie-consent",
      JSON.stringify(newSettings)
    );
    setShowBanner(false);
    setShowSettings(false);

    if (cookieSettings.analytics) {
      initializeGoogleAnalytics();
    }

    // Track custom consent
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "cookie_consent", {
        consent_type: "custom",
        analytics_consent: cookieSettings.analytics,
        youtube_consent: cookieSettings.youtube,
      });
    }
  };

  // Toggle Switch Component
  const ToggleSwitch = ({ checked, onChange, disabled = false }) => (
    <label
      style={{
        position: "relative",
        display: "inline-block",
        width: "44px",
        height: "24px",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={{
          opacity: 0,
          width: 0,
          height: 0,
        }}
      />
      <span
        style={{
          position: "absolute",
          cursor: disabled ? "not-allowed" : "pointer",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: checked ? "#007aff" : "#ccc",
          borderRadius: "24px",
          transition: "0.2s",
        }}
      >
        <span
          style={{
            position: "absolute",
            content: '""',
            height: "18px",
            width: "18px",
            left: checked ? "23px" : "3px",
            bottom: "3px",
            backgroundColor: "white",
            borderRadius: "50%",
            transition: "0.2s",
          }}
        />
      </span>
    </label>
  );

  if (!showBanner) {
    // Cookie Settings Button (always visible in bottom right)
    return (
      <div
        style={{
          position: "fixed",
          bottom: "80px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => setShowBanner(true)}
          style={{
            backgroundColor: "#86868b",
            color: "#ffffff",
            border: "none",
            borderRadius: "25px",
            padding: "10px 14px",
            fontSize: "16px",
            cursor: "pointer",
            opacity: 0.8,
            transition: "opacity 0.2s",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "1")}
          onMouseLeave={(e) => (e.target.style.opacity = "0.8")}
          title="Cookie-Einstellungen verwalten"
        >
          🍪
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Cookie Banner */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid #d2d2d7",
          padding: "20px",
          zIndex: 1000,
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: window.innerWidth < 768 ? "wrap" : "nowrap",
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: window.innerWidth < 768 ? "100%" : "300px",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#1d1d1f",
                margin: "0 0 8px 0",
              }}
            >
              🍪 Diese Website verwendet Cookies
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#86868b",
                margin: 0,
                lineHeight: "1.4",
              }}
            >
              Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung zu
              bieten. Notwendige Cookies ermöglichen die Grundfunktionen.
              Analytics-Cookies helfen uns, die Website zu verbessern.{" "}
              <button
                onClick={() => setShowSettings(!showSettings)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#007aff",
                  textDecoration: "underline",
                  fontSize: "13px",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Mehr erfahren
              </button>
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setShowSettings(!showSettings)}
              style={{
                backgroundColor: "transparent",
                color: "#1d1d1f",
                border: "1px solid #d2d2d7",
                borderRadius: "20px",
                padding: "10px 16px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
                minWidth: "fit-content",
              }}
            >
              Einstellungen
            </button>

            <button
              onClick={acceptNecessary}
              style={{
                backgroundColor: "#86868b",
                color: "#ffffff",
                border: "none",
                borderRadius: "20px",
                padding: "10px 16px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
                minWidth: "fit-content",
              }}
            >
              Nur notwendige
            </button>

            <button
              onClick={acceptAll}
              style={{
                backgroundColor: "#007aff",
                color: "#ffffff",
                border: "none",
                borderRadius: "20px",
                padding: "10px 16px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
                minWidth: "fit-content",
              }}
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>

      {/* Cookie Settings Panel */}
      {showSettings && (
        <div
          style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            right: "0",
            top: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1001,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "18px 18px 0 0",
              padding: "32px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
              margin: "0 20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#1d1d1f",
                  margin: 0,
                }}
              >
                Cookie-Einstellungen
              </h2>
              <button
                onClick={() => setShowSettings(false)}
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

            <p
              style={{
                color: "#86868b",
                fontSize: "14px",
                lineHeight: "1.5",
                marginBottom: "24px",
              }}
            >
              Wählen Sie, welche Cookies Sie zulassen möchten. Sie können diese
              Einstellungen jederzeit ändern.
            </p>

            {/* Cookie Categories */}
            <div style={{ marginBottom: "24px" }}>
              {/* Necessary Cookies */}
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1d1d1f",
                      margin: 0,
                    }}
                  >
                    🔧 Notwendige Cookies
                  </h3>
                  <div
                    style={{
                      backgroundColor: "#34c759",
                      color: "#ffffff",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: "500",
                    }}
                  >
                    Immer aktiv
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#86868b",
                    margin: 0,
                    lineHeight: "1.4",
                  }}
                >
                  Diese Cookies sind für die Grundfunktionen der Website
                  erforderlich und können nicht deaktiviert werden. Sie
                  speichern z.B. Ihre Filter-Einstellungen.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div
                style={{
                  padding: "16px",
                  backgroundColor: cookieSettings.analytics
                    ? "#e7f3ff"
                    : "#f8f9fa",
                  borderRadius: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1d1d1f",
                      margin: 0,
                    }}
                  >
                    📊 Analytics Cookies
                  </h3>
                  <ToggleSwitch
                    checked={cookieSettings.analytics}
                    onChange={(e) =>
                      setCookieSettings((prev) => ({
                        ...prev,
                        analytics: e.target.checked,
                      }))
                    }
                  />
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#86868b",
                    margin: 0,
                    lineHeight: "1.4",
                  }}
                >
                  Google Analytics hilft uns zu verstehen, wie Besucher die
                  Website nutzen. Wir sammeln anonymisierte Daten über
                  Seitenaufrufe und Nutzerverhalten.
                </p>
              </div>

              {/* YouTube Cookies */}
              <div
                style={{
                  padding: "16px",
                  backgroundColor: cookieSettings.youtube
                    ? "#e7f3ff"
                    : "#f8f9fa",
                  borderRadius: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1d1d1f",
                      margin: 0,
                    }}
                  >
                    🎥 YouTube Cookies
                  </h3>
                  <ToggleSwitch
                    checked={cookieSettings.youtube}
                    onChange={(e) =>
                      setCookieSettings((prev) => ({
                        ...prev,
                        youtube: e.target.checked,
                      }))
                    }
                  />
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#86868b",
                    margin: 0,
                    lineHeight: "1.4",
                  }}
                >
                  YouTube-Videos werden mit erweiterten
                  Datenschutz-Einstellungen geladen. Cookies werden nur gesetzt,
                  wenn Sie ein Video abspielen.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
                paddingTop: "16px",
                borderTop: "1px solid #f5f5f7",
              }}
            >
              <button
                onClick={acceptNecessary}
                style={{
                  backgroundColor: "transparent",
                  color: "#1d1d1f",
                  border: "1px solid #d2d2d7",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Nur notwendige
              </button>

              <button
                onClick={saveCustomSettings}
                style={{
                  backgroundColor: "#007aff",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Einstellungen speichern
              </button>
            </div>

            {/* Additional Info */}
            <div
              style={{
                marginTop: "24px",
                padding: "12px",
                backgroundColor: "#f5f5f7",
                borderRadius: "8px",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: "#86868b",
                  margin: 0,
                  lineHeight: "1.4",
                }}
              >
                Mehr Details finden Sie in unserer{" "}
                <a
                  href="/datenschutz"
                  style={{ color: "#007aff", textDecoration: "none" }}
                >
                  Datenschutzerklärung
                </a>{" "}
                und{" "}
                <a
                  href="/cookies"
                  style={{ color: "#007aff", textDecoration: "none" }}
                >
                  Cookie-Richtlinie
                </a>
                . Sie können Ihre Einstellungen jederzeit über das Cookie-Symbol
                unten rechts ändern.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieBanner;
