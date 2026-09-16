# QuizStorm 0.22

- Spelbakgrunden har tydligare men långsam displacement. Brusfältets form utvecklas mjukt, i stället för att bara ändra styrkan i ett stillastående fält. Vågrörelserna tar 29–47 sekunder. Förskjutningen är begränsad till högst 17 CSS-pixlar; bildens ytterkanter har extra marginal.
- När spelare läggs till eller tas bort uppdateras bara inställningsrutan. Menyscenens element och pågående animationer behålls, liksom musikens position.
- Menymusiken försöker spela direkt när sidan laddas och försöker igen när ljudfilen är redo. Webbläsarens regler kan fortfarande kräva ett första klick eller en tangenttryckning. Ljud av respekteras.
- Rätt svar använder den bifogade answer-correct.mp3, oförändrad. Det gäller även finalbedömning.

Packa upp hela arkivet och öppna dist/index.html. Vid webbpublicering används innehållet i dist.

Verifierat: test.cjs, effects-test.cjs och atmosphere-test.cjs godkända. Nya kontroller omfattar bibehållen menydom vid ändrat spelarantal, automatisk uppspelnings återförsök utan omstart, ljud av och förhindrad menymusik under spel. Displacement kontrollerad över 200 simulerade sekunder med gränser för styrka och kontinuitet samt paus i dold flik och vid minskad rörelse. JavaScript-syntax och ljudfilens identitet kontrollerade.

Visuell provkörning och verklig autoplay-kontroll återstår i användarens webbläsare. Arbetsmiljön har tidigare blockerat lokal filöppning.
