# QuizStorm 0.17

- Spelplanens bakgrund är nu den bifogade Ny bakgrund.png, optimerad till WebP.
- Kategorirubrikerna har bildbakgrunder med exakt 60 procent opacitet. Från vänster: Julius, Joan, Leonardo, Isac, Neil och Elon. Bilderna följer kolumnpositionerna även efter slumpning, manuellt kategoribyte och rundbyte. Kategorinamnens text är fullt opak med mörk textskugga för läsbarhet.
- Globens energitopp är kraftigare och vitare, med större ljuspunkter och förstärkt ljus runt punkterna. Grundljuset sänks aldrig.
- Pulsintervallet är 105 sekunder (1 minut 45 sekunder): 83 sekunder i grundläge, 8 sekunders mjuk uppgång, 2 sekunders topp, 12 sekunders återgång. Ljusstyrkefaktorn går från 1 till 2,5. Position, lutning, sexminutersrotation och reduced-motion är bevarade.
- Musikfix och förenklad meny från tidigare versioner är kvar.

## Testat 2026-09-16
Chromium och WebKit på Windows med fungerande WebGL: 2559x1274, 1440x1000, 390x844 och 844x390. Spelstart, frågor, reduced-motion, dold flik, menybyte, reservläge, WebGL-kontextförlust/återställning och lokal filöppning godkända.

Separata tester i båda webbläsarna, desktop och mobil: alla sex bilder laddas, exakt bildordning och opacitet 0,6, tillgängliga kategorinamn, bibehållen ordning efter tärningsslumpning, manuellt kategoribyte via tangentbord och rundbyte. Pulskurvan kontrollerad över tre cykler: minimum 1, maximum 2,5, 105 sekunder mellan topparna, inga hopp. Grundläge och energitopp visuellt granskade.

test.cjs och effects-test.cjs godkända. Spelkoden i app.js är identisk med 0.16 bortsett från versionsnumret och ett textomslag runt kategorirubrikerna. 140 ursprungliga filer byte-identiska före release-dokumentationen. Frågebank, ljudfiler, musikfix, svårighetslägen och regler är oförändrade.

Fysisk iPhone och Safari på macOS har inte testats. Tidigare rapporter gäller sina respektive versioner.

## Prova
Packa upp och öppna QuizStorm-0.17/dist/index.html. Vid webbpublicering: ersätt hela innehållet i dist/, inklusive assets/categories/.
