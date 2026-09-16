# QuizStorm 0.14 – spelplan med roterande 3D-glob

Bygger vidare på 0.13. Den bifogade blå/lila dimbakgrunden och punktgloben från QuizStorm-3D-Globe-v1.zip används bakom spelplanen.

- Ett varv tar tre minuter. Vita landpunkter har en lågmäld ljuspuls.
- Globen är dämpad bakom frågedialogen och blockerar aldrig klick eller svep.
- Scenen visas under ordinarie spelplan och frågor. Huvudmenyn från 0.13, finalen och vinnarskärmen behålls.
- Reduced-motion visar en stilla glob. Rotation och puls stannar när fliken är dold eller när man lämnar spelplanen, och fortsätter från samma vinkel när man kommer tillbaka.
- Direkt WebGL utan externa bibliotek eller CDN. Renderstorleken begränsas till 1280 pixlar per sida och mobil använder färre punkter.
- Utan WebGL visas samma landpunkter som en stilla 2D-projektion. Förlorad WebGL-kontext ger reservbild, och återställd kontext återstartar globen.
- Landmasken är inbäddad så att spelet även kan öppnas lokalt via dist/index.html. Natural Earths landkonturer är public domain. Originalpaketets information finns i review/globe-original-README.md.

## Testat 2026-09-16

Chromium och WebKit på Windows, båda med fungerande WebGL, i 1440x1000, 390x844 med 3x pixeltäthet och 844x390. Visuell kontroll av desktop, mobil och frågedialog.

Godkänt: spelstart till 30 rutor, klick på fråga, reduced-motion samt växling tillbaka, simulerad dold flik och återkomst, återgång till meny och pågående parti utan extra globinstans, dolt globlager vid final. Även testat framtvingad avsaknad av WebGL, faktisk kontextförlust/återställning via WebGL-testtillägget på desktop och lokal filöppning i båda motorerna. Inga JavaScript-fel. Detaljer i review/globe-0.14-tests.json.

test.cjs och effects-test.cjs passerar. 131 filer från 0.13 är byte-identiska före tillägg av releasedokumentationen. All app.js-kod är identisk förutom det visade versionsnumret. Frågebank, ljud, svårighetslägen, spelregler och menyanimationer är oförändrade.

Fysisk iPhone och Safari på macOS har inte testats. WebKit-testerna verifierar funktion i Windows-testmiljön, inte garanterad bildfrekvens på Apple-enheter. Äldre rapporter beskriver äldre versioner.

## Prova

Packa upp ZIP-filen och öppna QuizStorm-0.14/dist/index.html. Vid publicering: ladda upp hela innehållet i dist/, inklusive board-globe.js och assets/board-atmosphere.webp. Ingen byggning behövs.
