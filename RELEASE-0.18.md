# QuizStorm 0.18

- Globen använder rent vitt i ljuspunkterna och korrigerad alfabländning. Genomskinlighet på hela globlagret är borttagen så att kärnorna verkligen blir vita vid maximum. Vit gloria och ljusstyrka har förstärkts. Den ljusa grundnivån, pulsintervallet 105 sekunder, placering, lutning och sexminutersrotation är kvar.
- Kategoribilderna har gråskalefilter. Deras 60 procent opacitet och fasta ordning Julius, Joan, Leonardo, Isac, Neil, Elon är bevarade. Rubriktexten påverkas inte av filtret.
- Nytt originalproducerat nivåvalsljud: 0,28 sekunder, 48 kHz stereo PCM WAV. Ett mjukt syntklick med rund botten, ljus ton och kort stereosvans. Ljudet förladdas, spelas en gång när en ny nivå öppnas och följer Ljud på/av. Spelad ruta och en redan öppen fråga ger inget extra ljud. Dubbelchans behåller sin fanfar och får samma korta valklick.

## Kontroller 2026-09-16
Chromium och WebKit på Windows, WebGL: 2559x1274, 1440x1000, 390x844, 844x390. Layout, frågor, reduced-motion, dolda flikar, reservbild, kontextförlust/återställning och lokal filöppning godkända.
GPU-pixlar lästa vid energitoppen: ogenomskinliga ljuskärnor har R=G=B och värden nära 255, utan gul färgton. CSS-kontroll: gråskalefilter och opacitet 0,6 på alla sex bilder. Visuell kontroll av spelplanen vid maximum.
Ny ljudfil verifierad för samplingsfrekvens, stereo, nivå, liten DC-komponent, mjukt slut och ingen klippning. Faktisk WAV-uppspelning inklusive full längd verifierad i Chromium. WebKit i Windows kunde inte spela ljudfilen; där verifierades anrop, mute och spärrar men inte hörbar uppspelning. Fysisk iPhone och Safari på macOS har inte testats.
test.cjs och effects-test.cjs godkända, inklusive musikregression och nya nivåljudstester. 149 filer verifierade identiska med 0.17 före ny testkod och releasedokumentation. Alla tidigare ljudfiler, frågebank och svårighetslägen är oförändrade.

## Prova
Packa upp och öppna QuizStorm-0.18/dist/index.html. Vid publicering: ersätt hela innehållet i dist/, även den nya assets/audio/level-select.wav. Äldre rapporter gäller sina respektive versioner.
