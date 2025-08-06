import React from "react";

const Cookies = () => {
  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
        lineHeight: "1.6",
        color: "#1d1d1f",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "600",
          marginBottom: "24px",
        }}
      >
        Cookie-Richtlinie
      </h1>

      <h2>Was sind Cookies?</h2>
      <p>
        Cookies sind kleine Textdateien, die von Websites auf Ihrem Computer
        oder mobilen Gerät gespeichert werden. Sie ermöglichen es der Website,
        Ihre Aktionen und Vorlieben über einen bestimmten Zeitraum zu speichern.
      </p>

      <h2>Welche Cookies verwenden wir?</h2>

      <h3>🔧 Notwendige Cookies (Technisch erforderlich)</h3>
      <p>
        Diese Cookies sind für das ordnungsgemäße Funktionieren der Website
        unerlässlich und können nicht deaktiviert werden:
      </p>
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "12px",
          borderRadius: "6px",
          margin: "10px 0",
        }}
      >
        <strong>React Application State:</strong>
        <br />
        <small>
          Speichert Filter-Einstellungen, erweiterte Karten-Ansichten und andere
          UI-Zustände
          <br />
          Speicherdauer: Session (bis Browser geschlossen wird)
          <br />
          Zweck: Website-Funktionalität
        </small>
      </div>

      <h3>📊 Analytics Cookies (mit Ihrer Einwilligung)</h3>
      <p>
        Wir verwenden Google Analytics 4, um zu verstehen, wie Besucher unsere
        Website nutzen:
      </p>

      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "12px",
          borderRadius: "6px",
          margin: "10px 0",
        }}
      >
        <strong>_ga:</strong>
        <br />
        <small>
          Unterscheidet eindeutige Benutzer
          <br />
          Speicherdauer: 2 Jahre
          <br />
          Anbieter: Google Analytics
        </small>
      </div>

      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "12px",
          borderRadius: "6px",
          margin: "10px 0",
        }}
      >
        <strong>_ga_[Container-ID]:</strong>
        <br />
        <small>
          Speichert Session-Status und Seitenaufrufe
          <br />
          Speicherdauer: 2 Jahre
          <br />
          Anbieter: Google Analytics
        </small>
      </div>

      <h3>🎥 YouTube Cookies</h3>
      <p>
        Wenn Sie ein YouTube-Video auf unserer Website abspielen, werden
        folgende Cookies gesetzt:
      </p>

      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "12px",
          borderRadius: "6px",
          margin: "10px 0",
        }}
      >
        <strong>YSC:</strong>
        <br />
        <small>
          YouTube Session Cookie
          <br />
          Speicherdauer: Session
          <br />
          Anbieter: YouTube (Google)
        </small>
      </div>

      <h2>Cookie-Verwaltung</h2>
      <p>
        Sie können Cookies jederzeit in Ihren Browsereinstellungen verwalten
        oder löschen. Beachten Sie jedoch, dass das Deaktivieren bestimmter
        Cookies die Funktionalität der Website beeinträchtigen kann.
      </p>

      <h3>Browser-spezifische Anleitungen:</h3>
      <ul>
        <li>
          <strong>Google Chrome:</strong> Einstellungen → Datenschutz und
          Sicherheit → Cookies und andere Websitedaten
        </li>
        <li>
          <strong>Mozilla Firefox:</strong> Einstellungen → Datenschutz &
          Sicherheit → Cookies und Website-Daten
        </li>
        <li>
          <strong>Safari:</strong> Einstellungen → Datenschutz → Cookies und
          Website-Daten verwalten
        </li>
        <li>
          <strong>Microsoft Edge:</strong> Einstellungen → Cookies und
          Websiteberechtigungen
        </li>
      </ul>

      <h3>Google Analytics Opt-out</h3>
      <p>
        Sie können die Erfassung durch Google Analytics verhindern, indem Sie
        das
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Analytics Opt-out Browser-Add-on
        </a>{" "}
        herunterladen und installieren.
      </p>

      <h2>Ihre Einstellungen</h2>
      <p>
        Sie können Ihre Cookie-Einstellungen jederzeit über den Cookie-Banner
        anpassen, der beim ersten Besuch erscheint. Sie können auch jederzeit
        Ihre Einwilligung widerrufen, indem Sie uns unter bergkabuff@gmail.com
        kontaktieren.
      </p>

      <p>
        <strong>Letzte Aktualisierung:</strong>{" "}
        {new Date().toLocaleDateString("de-DE")}
      </p>
    </div>
  );
};

export default Cookies;
