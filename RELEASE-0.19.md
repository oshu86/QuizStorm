# QuizStorm 0.19

- Alternativ bakgrund är ny bakgrund på spelplanen.
- De sex nya bilderna ersätter de gamla i ordningen Julius, Joan, Leonardo, Isac, Neil, Elon. Opaciteten är 60 procent och tidigare gråskalefilter är kvar.
- Din MP3 används vid nivåval, kopierad utan ändring. Längd cirka 2,01 sekunder. Den följer ljudknappen och spelas inte för redan spelade rutor eller när en fråga redan är öppen.
- Globens vita ljus, 105-sekunderspuls och övriga funktioner är bevarade.

## Kontroller
Spel- och ljudtester godkända. Chromium och WebKit på Windows: desktop, mobil stående/liggande, reduced-motion, reservrendering, kontextåterställning och lokal filöppning. Bildordning och 60 procents opacitet kontrollerade även efter kategoribyte och ny omgång. Faktisk fullständig MP3-uppspelning verifierad i Chromium. WebKit-testmiljön kunde inte spela ljud; anrop och ljudspärrar verifierade där. Fysisk iPhone/Safari har inte testats.
148 tidigare filer verifierade identiska före releasedokumentation, inklusive frågebank, globkod, CSS och tidigare ljudfiler. Den nya MP3-filen matchar originalet byte för byte.

Packa upp ZIP och öppna QuizStorm-0.19/dist/index.html. Vid publicering ersätt hela dist inklusive assets. Äldre rapporter gäller respektive äldre version.
