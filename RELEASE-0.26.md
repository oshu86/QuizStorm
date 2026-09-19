# QuizStorm 0.26

- Ny bifogad blå grafik för kategorier och ospelade nivåer. Opaciteten är fortsatt 64 procent normalt och 45 procent vid muspekare över en aktiv ruta.
- Spelplanens rutor ligger kant i kant, har raka hörn och skiljs av en svart linje på en pixel. Spelade nivåer följer samma rutform och behåller QuizStorm2-grafiken med 60 procents opacitet.
- Rutorna är något högre: normalt 88 pixlar för kategorier och 84 för nivåer. Anpassade höjder används på stora skärmar, mobil och i liggande läge.
- Tangentbordsfokus visas innanför rutan. Tryck på en ruta skapar ingen tillfällig glipa i rutnätet.

Packa upp hela arkivet och öppna dist/index.html. GitHub Pages publicerar fortsatt dist.

Kontroller: asset-check.cjs och test.cjs godkända. Bildkopian kontrollerad mot originalet med SHA-256. Visuell provkörning på dator och iPhone återstår.
