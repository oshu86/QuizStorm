# QuizStorm 0.21

- Spelplanen har 30 slumpmässigt placerade stjärnor, varav sex större och ljusstarkare. På smala skärmar visas 22 stjärnor, varav fyra närmare. Varje stjärna har sin egen långsamma rörelse och mjuka puls.
- Bakgrundsbilden har en mycket subtil displacement-effekt. Ett mjukt, fast brusfält förskjuter bilden högst fyra CSS-pixlar. Styrkan ändras kontinuerligt med vågor på 61 och 97 sekunder, utan nya slumpvärden mellan bildrutorna.
- Effekten berör endast bakgrundsbilden. Nivåer, knappar, text och jordglob behåller sin vanliga rendering.
- Rörelsen pausas utanför spelplanen och när fliken är dold. Minskad rörelse stänger av displacement och stjärnornas animationer.

Packa upp hela arkivet och öppna dist/index.html. Vid webbpublicering används innehållet i dist.

Verifiering: test.cjs, effects-test.cjs och atmosphere-test.cjs godkända. Det nya testet kontrollerar 200 sekunders jämn rörelse, amplitudgränser, paus/återupptagning, minskad rörelse, 30 stjärnor och sex närmare stjärnor. JavaScript-syntax kontrollerad. Visuell provkörning i webbläsare återstår på grund av arbetsmiljöns tidigare blockering av lokala filer.
