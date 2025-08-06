import React from "react";

const Datenschutz = () => {
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
        Datenschutzerklärung
      </h1>

      <h2>1. Datenschutz auf einen Blick</h2>

      <h3>Allgemeine Hinweise</h3>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit
        Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
        Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
        identifiziert werden können. Ausführliche Informationen zum Thema
        Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten
        Datenschutzerklärung.
      </p>

      <h3>Datenerfassung auf dieser Website</h3>
      <h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
      <p>
        Die Datenverarbeitung auf dieser Website erfolgt durch den
        Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser
        Website entnehmen.
      </p>

      <h4>Wie erfassen wir Ihre Daten?</h4>
      <p>
        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
        mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein
        Kontaktformular eingeben.
      </p>

      <p>
        Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch
        der Website durch unsere IT-Systeme erfasst. Das sind vor allem
        technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des
        Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald
        Sie diese Website betreten.
      </p>

      <h2>2. Hosting</h2>
      <h3>Vercel Inc.</h3>
      <p>
        Wir hosten unsere Website bei Vercel Inc., 340 S Lemon Ave #4133,
        Walnut, CA 91789, USA. Vercel ist unser Auftragsverarbeiter. Details
        entnehmen Sie der Datenschutzerklärung von Vercel:
        <a
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://vercel.com/legal/privacy-policy
        </a>
      </p>

      <h2>3. Hinweis zur verantwortlichen Stelle</h2>
      <p>
        Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website
        ist:
      </p>
      <p>
        René Sander
        <br />
        Wiehengebirgsweg 21
        <br />
        32609 Hüllhorst
        <br />
        Deutschland
        <br />
        E-Mail: bergkabuff@gmail.com
      </p>

      <h2>4. Datenerfassung auf dieser Website</h2>
      <h3>Supabase Database</h3>
      <p>
        Diese Website nutzt Supabase (Supabase Inc., USA) für die Speicherung
        und Verwaltung der Bucket-List-Ziele. Gespeicherte Daten umfassen
        ausschließlich:
      </p>
      <ul>
        <li>Titel der persönlichen Lebensziele</li>
        <li>Beschreibungen der Ziele</li>
        <li>Status-Informationen (geplant, in Arbeit, abgeschlossen)</li>
        <li>Kategorien und Tags</li>
        <li>Fortschritts-Daten</li>
        <li>Prioritäten und Deadlines</li>
      </ul>
      <p>
        Diese Daten sind ausschließlich persönliche Inhalte des
        Websitebetreibers und enthalten keine personenbezogenen Daten von
        Besuchern. Die Übertragung erfolgt SSL-verschlüsselt.
      </p>

      <h2>5. Google Analytics 4</h2>
      <p>
        Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics.
        Anbieter ist die Google Ireland Limited („Google"), Gordon House, Barrow
        Street, Dublin 4, Irland.
      </p>

      <p>
        Google Analytics verwendet Cookies, die eine Analyse der Benutzung der
        Website durch Sie ermöglichen. Die durch das Cookie erzeugten
        Informationen über Ihre Benutzung dieser Website werden in der Regel an
        einen Server von Google in den USA übertragen und dort gespeichert.
      </p>

      <h2>6. YouTube mit erweitertem Datenschutz</h2>
      <p>
        Diese Website bindet Videos der Website YouTube ein. Betreiber der
        Website ist die Google Ireland Limited („Google"), Gordon House, Barrow
        Street, Dublin 4, Irland.
      </p>

      <p>
        Wir nutzen YouTube im erweiterten Datenschutzmodus. Dieser Modus bewirkt
        laut YouTube, dass YouTube keine Informationen über die Besucher auf
        dieser Website speichert, bevor diese sich das Video ansehen.
      </p>

      <h2>7. Ihre Rechte</h2>
      <p>Sie haben folgende Rechte:</p>
      <ul>
        <li>
          <strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie können Auskunft
          über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.
        </li>
        <li>
          <strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie haben ein
          Recht auf unverzügliche Berichtigung Sie betreffender unrichtiger
          personenbezogener Daten.
        </li>
        <li>
          <strong>Löschungsrecht (Art. 17 DSGVO):</strong> Sie können die
          Löschung Ihrer personenbezogenen Daten verlangen.
        </li>
        <li>
          <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie haben das
          Recht, jederzeit gegen die Verarbeitung der Sie betreffenden
          personenbezogenen Daten Widerspruch einzulegen.
        </li>
      </ul>

      <p>
        Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: bergkabuff@gmail.com
      </p>

      <p>
        <strong>Stand der Datenschutzerklärung:</strong>{" "}
        {new Date().toLocaleDateString("de-DE")}
      </p>
    </div>
  );
};

export default Datenschutz;
