import React from "react";

const Impressum = () => {
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
        Impressum
      </h1>

      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        <strong>René Sander</strong>
        <br />
        Wiehengebirgsweg 21
        <br />
        32609 Hüllhorst
        <br />
        Deutschland
      </p>

      <h3>Kontakt</h3>
      <p>E-Mail: bergkabuff@gmail.com</p>

      <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
      <p>
        René Sander
        <br />
        Wiehengebirgsweg 21
        <br />
        32609 Hüllhorst
      </p>

      <h3>EU-Streitschlichtung</h3>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        <br />
        Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>

      <h3>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h3>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherstreitschlichtungsstelle teilzunehmen.
      </p>

      <h3>Haftung für Inhalte</h3>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
        bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der
        Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu
        überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
        Tätigkeit hinweisen.
      </p>

      <h3>Haftung für Links</h3>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich.
      </p>
    </div>
  );
};

export default Impressum;
