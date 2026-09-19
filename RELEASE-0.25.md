# QuizStorm 0.25

- Porträtten i huvudmenyn färgtonas med djupblå skuggor, mörklila mellantoner och rosa högdagrar. Originalbildernas transparens och de mjuka kantmaskerna behålls.
- Personernas ordning blandas vid start och sedan på nytt efter varje grupp om fem. Alla fem får visas innan nästa blandning, och samma person visas inte direkt två gånger i följd. Bildbyte sker när porträttets lager är helt genomskinligt.
- Ändringar av fönsterhöjden under skrollning bygger inte längre om menyanimationerna. Vid ändrad bredd, exempelvis skärmrotation, justeras placeringarna utan att starta om animationerna. Symbolernas banor använder skärmens mått direkt.

Packa upp hela arkivet och öppna dist/index.html. För GitHub Pages publiceras dist som tidigare.

Verifiering: asset-check.cjs, test.cjs, effects-test.cjs, atmosphere-test.cjs och det nya menu-motion-test.cjs godkända. Det nya testet simulerar förändringar av skärmhöjd, rotation, paus/återupptagning, minskad rörelse och flera blandningar av porträtten. Det kontrollerar att animationernas objekt och uppspelningstid bevaras vid storleksändring.

Visuell kontroll av färgtonerna och provkörning på fysisk iPhone återstår.
