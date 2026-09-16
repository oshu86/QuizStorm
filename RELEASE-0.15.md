# QuizStorm 0.15

- Globen är flyttad åt höger till området i din markerade bild, centrerad ungefär 76 procent från vänster och 44 procent från toppen på desktop. Den ligger fortfarande bakom spelplanen och lutar 12 grader.
- Ett varv tar nu sex minuter i stället för tre.
- Ljuspulsen tar 24 sekunder per cykel och är tydligare (±28 procent), med lugn sinuskurva. Reduced-motion stänger av rotation och puls.
- Menymusiken fortsätter utan paus eller omstart när spelare läggs till eller tas bort. Orsaken var att renderMenu nollställde allt ljud även vid en enkel formuläruppdatering. Dessa uppdateringar bevarar nu musiken; vanliga skärmbyten behåller tidigare ljudhantering.

## Tester 2026-09-16

Chromium och WebKit: 2559x1274 (som din referens), 1440x1000, 390x844 och 844x390. Kontrollerat layout, spelstart, frågeöppning, reduced-motion, paus vid dold flik, återgång mellan meny och spel, WebGL-reservläge, kontextförlust/återställning och lokal filöppning. Desktopbild visuellt jämförd med din markering.

Chromium med verklig MP3-uppspelning: tre tillägg/borttagningar av spelare, utan pause- eller seeking-händelser och med samma ljudinstans. Uppspelningstiden fortsatte öka. Kontrollerat att ljud av förblir av vid spelarändring och att spelstart stoppar menymusiken. WebKits Windows-testmiljö kunde inte starta MP3-uppspelningen, så verklig ljuduppspelning är inte verifierad där. Ett separat automatiskt regressionstest med simulerat ljud kontrollerar också att tidspositionen bevaras exakt.

test.cjs (inklusive ny musikregression) och effects-test.cjs körs även från uppackad slut-ZIP. 135 filer från 0.14 verifierades identiska innan test och releasedokumentation lades till. Ljudfilerna, effects.js och frågebanken är oförändrade. Spelets regler och svårighetslägen är bevarade.

Fysisk iPhone och Safari på macOS har inte testats. Äldre releasefiler beskriver tidigare versioner.

## Starta

Packa upp och öppna QuizStorm-0.15/dist/index.html. För webbpublicering ersätter du hela innehållet i dist/ på ditt befintliga webbhotell.
