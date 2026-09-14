# QuizStorm 0.5

Svenskt Jeopardy-spel för 2–8 spelare. Spelledaren visar en beskrivande ledtråd och bedömer muntliga svar i frågeform. Statisk HTML/CSS/JavaScript i dist/, utan serverdatabas.

## Nytt i 0.5

- 100 kategorier × fem nivåer × fem alternativ = 2 500 ordinarie ledtrådar.
- 80 separata finalledtrådar. Huvudfacit och registrerade alias är unika inom banken och mellan ordinarie bank och finalpool.
- En ledtråd dras från varje nivåpool. Det dragna innehållet sparas med partiet och bevaras vid omladdning.
- Sex kategorier per omgång. Byte tillåts före första öppnade ledtråden. Även bortbytta kategorier spärras i senare omgångar; vid många byten reserveras kategorier till återstående omgångar.
- Äldre sparade partier behåller redan dragna ledtrådar. Starta ett nytt parti för att testa hela den nya banken.

Utgångspunkt är fungerande commit 72dab6fc5fb25640839b4c3d20cec3a5f395c473. CSS, effektmodul och tre bilder är oförändrade. Ljud och fyrverkerier skapas i effects.js.

## Spelregler

Tre omgångar med poäng 100–500, 200–1 000 respektive 300–1 500. Nivån inom kategorin avgör svårigheten. Svarstider: 5/10/20/30 sekunder; finaltid: 30/45/60 sekunder.

Spelledaren väljer vem som försöker svara. Fel svar och utgången svarstid ger minuspoäng. Övriga spelare får försöka en gång var med ny tid. Inget svar stänger rutan utan ytterligare poängändring. Senaste bedömningen kan ångras. Håll inne ett spelarnamn för poängkorrigering; Enter eller mellanslag fungerar också.

En dold dubbelchans per omgång med satsningsutrymme upp till 1 500 vid noll eller negativ poäng. Endast spelare med positiv poäng deltar i finalen; minsta satsning är 1. Lika slutpoäng ger delad seger. Tider pausas vid dold flik och återupptagning. Parti och ljudval lagras lokalt i webbläsaren.

## Kod och återställning

Mappen dist är den färdiga webbplatsen och innehåller alla bilder. .openai/hosting.json pekar på det befintliga Sites-projektet. Skapa inget nytt projekt vid återställning.

Redigerbara ledtrådar finns i bank-source. Varje kategori har 25 rader grupperade fem och fem efter nivå. Kör node build-bank.cjs efter ändring för att skapa dist/data.js. Granskningsmetod och källor finns i review/EDITORIAL.md.

## Tester

Kör följande från projektmappen med Node.js och Git:

    node build-bank.cjs
    node test.cjs
    node effects-test.cjs
    node variation-test.cjs

Variationstestet spelar 1 000 hela partier med 90 000 ordinarie rutor och 6 000 kategoribyten. Alla 2 500 alternativ och 80 finaler förekommer i körningen. Det kontrollerar även extrema mängder byten samt återupptagning och kompatibilitet med ursprungsversionens sparade partier. Det senare testet kräver Git-historiken som medföljer säkerhetskopian. Resultat finns i review/.

Visuellt webbläsartest omfattar start, kategoribyte, öppnad ledtråd, facit och omladdning. Test på fysisk iPhone återstår. Svårighet är redaktionellt bedömd; provspel med målgruppen behövs för ytterligare kalibrering. Alla ledtrådar har inte var för sig verifierats mot externa källor.

Spelmeny → Testverktyg låter spelledaren hoppa till senare omgångar. Vid innehållsfeedback: ange kategori, poängnivå och hela ledtråden.
