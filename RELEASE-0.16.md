# QuizStorm 0.16

## Ändringar
- Spelplanen använder den nya bifogade bilden ChatGPT Image 16 sep. 2026 04_43_37.png, optimerad som WebP.
- Globen har högre, konstant grundljusstyrka. Den gamla pulsen som även mörkade globen är borttagen. Ingen periodisk variation går under grundnivån.
- En energipuls per minut: 38 sekunder i grundläge, 8 sekunders mjuk uppgång, 2 sekunders topp och 12 sekunders mjuk återgång. Ljusstyrkefaktorn är 1–1,65 och punktglöden växer försiktigt under toppen. Reduced-motion visar grundläget utan puls.
- Globen behåller sin högra placering, lutning och sex minuter långa rotation. Automatisk extra dämpning vid frågeöppning är borttagen så att globen även då förblir synlig.
- Borttaget ur menyn enligt markeringarna: beskrivningstexten under QuizStorm, de tre informationsetiketterna och förklaringen under svårighetsvalet. Titel, övre slogan, skaparkredit och alla spelinställningar är kvar.
- Musikfixen från 0.15 är bevarad. Spelmekanik, frågebank, ljudfiler och svårighetslägen är oförändrade.

## Testat 2026-09-16
Chromium och WebKit med fungerande WebGL på Windows: 2559x1274, 1440x1000, 390x844 och 844x390. Spelstart, frågeklick, meny/parti, reduced-motion, paus vid dold flik, reservläge, förlust/återställning av WebGL och lokal filöppning godkända.

Separat kontroll i desktop och mobil: de markerade menytexterna är borttagna, skaparkrediten och tre svårighetsval finns kvar. Pulskurvan samplad över tre minuter: aldrig under 1, max 1,65, mjuka övergångar utan hopp. Uniformvärden för grundläge och topp kontrollerade i WebGL. Skärmbilder av grundläge, topp och meny visuellt granskade.

test.cjs och effects-test.cjs godkända, inklusive musikregressionen för spelarändring. 136 filer verifierade identiska med 0.15 före ny dokumentation. Fysisk iPhone/Safari på macOS har inte testats. Tidigare releasefiler och loggar gäller sina respektive äldre versioner.

## Prova
Packa upp ZIP och öppna QuizStorm-0.16/dist/index.html. Vid webbpublicering: ersätt hela innehållet i dist/.
