import { useState } from "react";

const LegalPages = () => {
  const [activeTab, setActiveTab] = useState("impressum");

  const legalContent = {
    impressum: {
      title: "Impressum",
      content: `
        <h2>Angaben gemäß § 5 TMG</h2>
        <p><strong>René Sander</strong><br/>
        Wiehengebirgsweg 21<br/>
        32609 Hüllhorst<br/>
        Deutschland</p>

        <h3>Kontakt</h3>
        <p>E-Mail: bergkabuff@gmail.com</p>

        <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
        <p>René Sander<br/>
        Wiehengebirgsweg 21<br/>
        32609 Hüllhorst</p>

        <h3>EU-Streitschlichtung</h3>
        <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a><br/>
        Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

        <h3>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h3>
        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
        Verbraucherstreitschlichtungsstelle teilzunehmen.</p>

        <h3>Haftung für Inhalte</h3>
        <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
        allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
        unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
        Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>

        <h3>Haftung für Links</h3>
        <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
        Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten 
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
      `,
    },
    datenschutz: {
      title: "Datenschutzerklärung",
      content: `
        <h2>1. Datenschutz auf einen Blick</h2>
        
        <h3>Allgemeine Hinweise</h3>
        <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
        Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen 
        Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen 
        Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>

        <h3>Datenerfassung auf dieser Website</h3>
        <h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
        <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
        können Sie dem Impressum dieser Website entnehmen.</p>

        <h4>Wie erfassen wir Ihre Daten?</h4>
        <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich 
        z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>

        <p>Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere 
        IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder 
        Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.</p>

        <h4>Wofür nutzen wir Ihre Daten?</h4>
        <p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. 
        Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>

        <h4>Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
        <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer 
        gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung 
        oder Löschung dieser Daten zu verlangen.</p>

        <h2>2. Hosting</h2>
        <h3>Vercel Inc.</h3>
        <p>Wir hosten unsere Website bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. 
        Vercel ist unser Auftragsverarbeiter. Details entnehmen Sie der Datenschutzerklärung von Vercel: 
        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">https://vercel.com/legal/privacy-policy</a></p>

        <p>Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein 
        berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine 
        entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage 
        von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG.</p>

        <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
        <h3>Datenschutz</h3>
        <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln 
        Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften 
        sowie dieser Datenschutzerklärung.</p>

        <h3>Hinweis zur verantwortlichen Stelle</h3>
        <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
        <p>René Sander<br/>
        Wiehengebirgsweg 21<br/>
        32609 Hüllhorst<br/>
        Deutschland<br/>
        E-Mail: bergkabuff@gmail.com</p>

        <p>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit 
        anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.</p>

        <h2>4. Datenerfassung auf dieser Website</h2>
        <h3>Server-Log-Dateien</h3>
        <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, 
        die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
        <ul>
          <li>Browsertyp und Browserversion</li>
          <li>Verwendetes Betriebssystem</li>
          <li>Referrer URL</li>
          <li>Hostname des zugreifenden Rechners</li>
          <li>Uhrzeit der Serveranfrage</li>
          <li>IP-Adresse</li>
        </ul>
        <p>Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>

        <h3>Supabase Database</h3>
        <p>Diese Website nutzt Supabase (Supabase Inc., USA) für die Speicherung und Verwaltung der Bucket-List-Ziele. 
        Gespeicherte Daten umfassen ausschließlich:</p>
        <ul>
          <li>Titel der persönlichen Lebensziele</li>
          <li>Beschreibungen der Ziele</li>
          <li>Status-Informationen (geplant, in Arbeit, abgeschlossen)</li>
          <li>Kategorien und Tags</li>
          <li>Fortschritts-Daten</li>
          <li>Prioritäten und Deadlines</li>
        </ul>
        <p>Diese Daten sind ausschließlich persönliche Inhalte des Websitebetreibers und enthalten keine 
        personenbezogenen Daten von Besuchern. Die Übertragung erfolgt SSL-verschlüsselt.</p>

        <h3>Notion Integration</h3>
        <p>Zur Content-Synchronisation wird die Notion API (Notion Labs Inc., USA) verwendet. 
        Es werden ausschließlich die oben genannten Bucket-List-Inhalte synchronisiert. 
        Keine Besucherdaten werden an Notion übertragen.</p>

        <h2>5. Analyse-Tools und Werbung</h2>
        <h3>Google Analytics 4</h3>
        <p>Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die 
        Google Ireland Limited („Google"), Gordon House, Barrow Street, Dublin 4, Irland.</p>

        <p>Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten der Websitebesucher zu analysieren. 
        Hierbei erhält der Websitebetreiber verschiedene Nutzungsdaten, wie z. B. Seitenaufrufe, Verweildauer, 
        verwendete Betriebssysteme und Herkunft des Nutzers.</p>

        <p>Google Analytics verwendet Cookies, die eine Analyse der Benutzung der Website durch Sie ermöglichen. 
        Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel 
        an einen Server von Google in den USA übertragen und dort gespeichert.</p>

        <p>Die Nutzung von Google Analytics erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO. 
        Der Websitebetreiber hat ein berechtigtes Interesse an der Analyse des Nutzerverhaltens, 
        um sowohl sein Webangebot als auch seine Werbung zu optimieren. Sofern eine entsprechende 
        Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von 
        Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG.</p>

        <h2>6. Plugins und Tools</h2>
        <h3>YouTube mit erweitertem Datenschutz</h3>
        <p>Diese Website bindet Videos der Website YouTube ein. Betreiber der Website ist die 
        Google Ireland Limited („Google"), Gordon House, Barrow Street, Dublin 4, Irland.</p>

        <p>Wir nutzen YouTube im erweiterten Datenschutzmodus. Dieser Modus bewirkt laut YouTube, 
        dass YouTube keine Informationen über die Besucher auf dieser Website speichert, bevor diese sich das Video ansehen. 
        Die Weitergabe von Daten an YouTube-Partner wird durch den erweiterten Datenschutzmodus hingegen nicht zwingend ausgeschlossen.</p>

        <p>Sobald Sie ein YouTube-Video starten, wird eine Verbindung zu den Servern von YouTube hergestellt. 
        Dabei wird dem YouTube-Server mitgeteilt, welche unserer Seiten Sie besucht haben.</p>

        <p>Des Weiteren kann YouTube verschiedene Cookies auf Ihrem Endgerät speichern oder vergleichbare 
        Wiedererkennungstechnologien verwenden (z. B. Device-Fingerprinting).</p>

        <p>Die Nutzung von YouTube erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote. 
        Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. 
        Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf 
        Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG.</p>

        <h2>7. Ihre Rechte</h2>
        <p>Sie haben folgende Rechte:</p>
        <ul>
          <li><strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</li>
          <li><strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie haben ein Recht auf unverzügliche Berichtigung Sie betreffender unrichtiger personenbezogener Daten.</li>
          <li><strong>Löschungsrecht (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer personenbezogenen Daten verlangen.</li>
          <li><strong>Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
          <li><strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, Ihre personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</li>
          <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten Widerspruch einzulegen.</li>
        </ul>
        
        <p>Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: bergkabuff@gmail.com</p>

        <p><strong>Stand der Datenschutzerklärung:</strong> ${new Date().toLocaleDateString(
          "de-DE"
        )}</p>
      `,
    },
    cookies: {
      title: "Cookie-Richtlinie",
      content: `
        <h2>Was sind Cookies?</h2>
        <p>Cookies sind kleine Textdateien, die von Websites auf Ihrem Computer oder mobilen Gerät gespeichert werden. 
        Sie ermöglichen es der Website, Ihre Aktionen und Vorlieben über einen bestimmten Zeitraum zu speichern, 
        so dass Sie diese nicht bei jedem Besuch der Website oder beim Navigieren von einer Seite zur anderen erneut eingeben müssen.</p>

        <h2>Welche Cookies verwenden wir?</h2>
        
        <h3>🔧 Notwendige Cookies (Technisch erforderlich)</h3>
        <p>Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich und können nicht deaktiviert werden:</p>
        <div style="background-color: #f8f9fa; padding: 12px; border-radius: 6px; margin: 10px 0;">
          <strong>React Application State:</strong><br/>
          <small>Speichert Filter-Einstellungen, erweiterte Karten-Ansichten und andere UI-Zustände<br/>
          Speicherdauer: Session (bis Browser geschlossen wird)<br/>
          Zweck: Website-Funktionalität</small>
        </div>

        <h3>📊 Analytics Cookies (mit Ihrer Einwilligung)</h3>
        <p>Wir verwenden Google Analytics 4, um zu verstehen, wie Besucher unsere Website nutzen:</p>
        
        <div style="background-color: #f8f9fa; padding: 12px; border-radius: 6px; margin: 10px 0;">
          <strong>_ga:</strong><br/>
          <small>Unterscheidet eindeutige Benutzer<br/>
          Speicherdauer: 2 Jahre<br/>
          Anbieter: Google Analytics</small>
        </div>

        <div style="background-color: #f8f9fa; padding: 12px; border-radius: 6px; margin: 10px 0;">
          <strong>_ga_[Container-ID]:</strong><br/>
          <small>Speichert Session-Status und Seitenaufrufe<br/>
          Speicherdauer: 2 Jahre<br/>
          Anbieter: Google Analytics</small>
        </div>

        <div style="background-color: #f8f9fa; padding: 12px; border-radius: 6px; margin: 10px 0;">
          <strong>_gid:</strong><br/>
          <small>Unterscheidet Benutzer für tägliche Statistiken<br/>
          Speicherdauer: 24 Stunden<br/>
          Anbieter: Google Analytics</small>
        </div>

        <h3>🎥 YouTube Cookies</h3>
        <p>Wenn Sie ein YouTube-Video auf unserer Website abspielen, werden folgende Cookies gesetzt:</p>
        
        <div style="background-color: #f8f9fa; padding: 12px; border-radius: 6px; margin: 10px 0;">
          <strong>YSC:</strong><br/>
          <small>YouTube Session Cookie<br/>
          Speicherdauer: Session<br/>
          Anbieter: YouTube (Google)</small>
        </div>

        <div style="background-color: #f8f9fa; padding: 12px; border-radius: 6px; margin: 10px 0;">
          <strong>VISITOR_INFO1_LIVE:</strong><br/>
          <small>Schätzt die Bandbreite des Benutzers<br/>
          Speicherdauer: 179 Tage<br/>
          Anbieter: YouTube (Google)</small>
        </div>

        <h2>Cookie-Verwaltung</h2>
        <p>Sie können Cookies jederzeit in Ihren Browsereinstellungen verwalten oder löschen. 
        Beachten Sie jedoch, dass das Deaktivieren bestimmter Cookies die Funktionalität der Website beeinträchtigen kann.</p>

        <h3>Browser-spezifische Anleitungen:</h3>
        <ul>
          <li><strong>Google Chrome:</strong> Einstellungen → Datenschutz und Sicherheit → Cookies und andere Websitedaten</li>
          <li><strong>Mozilla Firefox:</strong> Einstellungen → Datenschutz & Sicherheit → Cookies und Website-Daten</li>
          <li><strong>Safari:</strong> Einstellungen → Datenschutz → Cookies und Website-Daten verwalten</li>
          <li><strong>Microsoft Edge:</strong> Einstellungen → Cookies und Websiteberechtigungen</li>
        </ul>

        <h3>Google Analytics Opt-out</h3>
        <p>Sie können die Erfassung durch Google Analytics verhindern, indem Sie das 
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
        Google Analytics Opt-out Browser-Add-on</a> herunterladen und installieren.</p>

        <h2>Ihre Einstellungen</h2>
        <p>Sie können Ihre Cookie-Einstellungen jederzeit über den Cookie-Banner anpassen, der beim ersten Besuch erscheint. 
        Sie können auch jederzeit Ihre Einwilligung widerrufen, indem Sie uns unter bergkabuff@gmail.com kontaktieren.</p>

        <p><strong>Letzte Aktualisierung:</strong> ${new Date().toLocaleDateString(
          "de-DE"
        )}</p>
      `,
    },
  };

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: "#ffffff",
        minHeight: "100vh",
      }}
    >
      {/* Header wie auf der Hauptseite */}
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
            <a href="/" style={{ textDecoration: "none", color: "#1d1d1f" }}>
              Bergkabuff
            </a>
          </h1>
          <nav style={{ display: "flex", gap: "32px" }}>
            <a
              href="/#goals"
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
              href="/#about"
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

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* Navigation Tabs */}
        <nav
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "32px",
            borderBottom: "1px solid #f5f5f7",
            overflowX: "auto",
            paddingBottom: "0",
          }}
        >
          {Object.keys(legalContent).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: "12px 20px",
                border: "none",
                backgroundColor: activeTab === key ? "#007aff" : "transparent",
                color: activeTab === key ? "#ffffff" : "#1d1d1f",
                borderRadius: "8px 8px 0 0",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                minWidth: "fit-content",
                whiteSpace: "nowrap",
                borderBottom:
                  activeTab === key
                    ? "2px solid #007aff"
                    : "2px solid transparent",
              }}
            >
              {legalContent[key].title}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <main
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "32px",
            border: "1px solid #f5f5f7",
            minHeight: "400px",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "600",
              color: "#1d1d1f",
              marginBottom: "24px",
            }}
          >
            {legalContent[activeTab].title}
          </h1>

          <div
            dangerouslySetInnerHTML={{
              __html: legalContent[activeTab].content,
            }}
            style={{
              lineHeight: "1.6",
              color: "#1d1d1f",
            }}
          />
        </main>
      </div>

      {/* Footer wie auf der Hauptseite aber mit rechtlichen Links */}
      <footer
        style={{
          borderTop: "1px solid #d2d2d7",
          padding: "40px 22px",
          textAlign: "center",
          backgroundColor: "#f5f5f7",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setActiveTab("impressum")}
            style={{
              background: "none",
              border: "none",
              color: activeTab === "impressum" ? "#007aff" : "#86868b",
              fontSize: "12px",
              cursor: "pointer",
              textDecoration: activeTab === "impressum" ? "underline" : "none",
            }}
          >
            Impressum
          </button>
          <button
            onClick={() => setActiveTab("datenschutz")}
            style={{
              background: "none",
              border: "none",
              color: activeTab === "datenschutz" ? "#007aff" : "#86868b",
              fontSize: "12px",
              cursor: "pointer",
              textDecoration:
                activeTab === "datenschutz" ? "underline" : "none",
            }}
          >
            Datenschutz
          </button>
          <button
            onClick={() => setActiveTab("cookies")}
            style={{
              background: "none",
              border: "none",
              color: activeTab === "cookies" ? "#007aff" : "#86868b",
              fontSize: "12px",
              cursor: "pointer",
              textDecoration: activeTab === "cookies" ? "underline" : "none",
            }}
          >
            Cookies
          </button>
        </div>
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
    </div>
  );
};

export default LegalPages;
