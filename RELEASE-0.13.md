# QuizStorm 0.13 – mjuk huvudmeny

Utgår från den uppladdade QuizStorm-0.12-live-main-menu.zip.

## Ändringar
- Sömlösa, långsamma transform/opacity-loopar med matchande start/slut och mjuk easing. Individuella tider och startfaser för symbolerna.
- Sex medskickade röklager bakom och framför personer och berg. Statiska kantmasker mjukar upp porträttens nederkanter och bergets bas.
- Borttagna filter och backdrop-blur i menyn. Gradientglöd är statisk.
- Mobilen animerar rök och symboler medan stora motiv står stilla. Reduced-motion stänger av all dekorativ menyrörelse. Dold sida pausar rörelserna.
- Optimerade WebP-varianter i rätt storlek: aktiva menybilder 44 184 480 -> 3 405 792 byte. PNG-originalen behålls som källmaterial i paketet men laddas inte av menyn.
- Menyns motivplacering och spelinställningar är bevarade. Versionsmärkningen är 0.13.

## Kontroller utförda 2026-09-16
- Chromium och WebKit på Windows, headless: 1440x1000, 1920x1080, 768x1024, 390x844 (3x), 320x568 (3x), 844x390. Alla tolv kombinationer godkända för bildladdning, ingen horisontell sidöverströmning, spelarval, svårighetsval och start till 30 spelrutor. Inga JavaScript-fel.
- Visuell granskning av desktop- och mobilbilder.
- Kontrollerat att alla animerade menyegenskaper är transform/opacity, alla loopar återvänder till samma värden och alla tider är minst 30 sekunder.
- Reduced-motion: noll menyanimationer. Pausklass: alla kvarvarande menyanimationer pausade. Spelstart tar bort menyn och dess animationer.
- test.cjs och effects-test.cjs godkända: poäng, timer, dubbelchans, final, kategoribyten, ljudbeteende och alla tre svårighetslägen. Ett gammalt menytest förväntade att pills saknades trots att de redan fanns i 0.12; testförväntningen är uppdaterad till den befintliga menyn.
- Historikberoende difficulty-test.cjs har inte kunnat köras: det uppladdade paketet saknar den Git-bundle som det testet kräver. Svårighetsmappningen täcks av test.cjs.
- 90 ursprungliga filer verifierade byte för byte oförändrade, utöver de fyra avsiktligt ändrade filerna ovan (innan release-dokumentation tillkom). Frågebank, bankkällor och ljudfiler är identiska. All kod i app.js utanför menuScene och den visade versionssträngen är identisk med 0.12.

## Prestanda och begränsningar
En kort jämförelse med mobilformat 390x844, 3x pixeltäthet, gav Chromium cirka 16,7 ms median per bild i 0.13 mot 33,4 ms i 0.12. Det är ett lokalt headless-stickprov, ingen garanti om bildfrekvens på andra enheter.
WebKit på Windows klarade funktion och layout, men gav låg animationsprestanda: cirka 200 ms median i 0.13 mot 1983 ms i originalet i jämförelsen. Detta är inte ett godkänt Safari-prestandatest. En fysisk iPhone och Safari på macOS har inte testats; prestandan där återstår att bekräfta. Fullständiga mätvärden finns i review/menu-0.13-performance.json och menu-0.13-browser-tests.json.
Äldre loggar i review/ tillhör tidigare versioner och är inte nya körningar.

## Prova
Packa upp ZIP-filen och öppna QuizStorm/dist/index.html, eller lägg innehållet i dist/ på samma webbhotell som tidigare. Ingen byggning behövs. På iPhone: öppna den publicerade webbadressen. Aktivera Minska rörelse i telefonens hjälpmedelsinställningar för en stilla meny.
