# QuizStorm 0.27

Svenskt frågesportspel för 2–8 spelare och en spelledare. Tre omgångar, dubbelchans och final. Spelet sparas lokalt i webbläsaren.

Spela: https://oshu86.github.io/QuizStorm/

## Projektets struktur

- `dist/` är hela den färdiga webbplatsen. Öppna `dist/index.html` för lokal körning.
- `dist/assets/` innehåller de bilder och ljud som webbplatsen använder.
- `dist/assets/menu-live/` innehåller menyns 29 WebP-bilder (cirka 3,4 MB).
- `source-assets/menu-live/` bevarar 34 PNG-original för framtida redigering. Dessa publiceras inte på GitHub Pages.
- `bank-source/` innehåller redigerbara frågor. `node build-bank.cjs` bygger om `dist/data.js`.
- `review/` och `RELEASE-*.md` innehåller historiska kontroller och versionsanteckningar.

Ladda inte upp ytterligare kopior av `audio`, `categories` eller `menu-live` direkt under `dist`. Rätt plats är under `dist/assets`. Använd Git för uppdateringar av hela projektet, så behöver mappar inte delas upp manuellt i GitHubs webbformulär.

## Kontroller och publicering

Kräver Node.js. Kör:

    node asset-check.cjs
    node test.cjs
    node effects-test.cjs
    node atmosphere-test.cjs
    node menu-motion-test.cjs

GitHub Actions kör kontrollerna före publicering av `dist` till GitHub Pages vid uppdateringar av `main`. Källbilder, tester och frågkällor ingår inte i den publicerade webbplatsen.

`difficulty-test.cjs` och `variation-test.cjs` är äldre historikjämförelser som behöver tidigare utvecklingscommits som inte finns i detta repo. De ingår därför inte i publiceringskontrollen. De aktuella speltesterna verifierar också svårighetslägena.

## Senaste versionen

Version 0.27 förbättrar ledtrådar och facit. Se `RELEASE-0.27.md` och `review/EDITORIAL.md` för granskningens omfattning, exempel och källor. Version 0.26:s grafik, raka rutnät och effekter är bevarade. Starta ett nytt parti för att få de uppdaterade ledtrådarna; redan dragna frågor i ett sparat parti är sparade med sin tidigare text.

Menymusiken försöker starta automatiskt. Webbläsaren kan kräva ett första klick eller tangenttryck. Inställningen för minskad rörelse ger stilla dekorationer. Tidigare sparade partier fungerar fortsatt.


