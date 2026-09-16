# QuizStorm 0.19

Senaste ändringar och aktuella testresultat: [RELEASE-0.19.md](RELEASE-0.19.md). Avsnitten om 0.11 nedan beskriver tidigare ändringar.

Svenskt frågesportspel för 2–8 spelare. Spelledaren visar en beskrivande ledtråd och bedömer muntliga svar i frågeform. Statisk HTML/CSS/JavaScript i dist/, utan serverdatabas.

## Nytt i 0.11

- **Dubbelchans** använder nu den nya användarskapade cirka 4,8 sekunder långa synthfanfaren.
- **Omgång 2 och 3** öppnas med den nya användarskapade cirka 7,7 sekunder långa gameshow-slingan.
- **Victory Lap** används som vinnarmusik tillsammans med de kontinuerliga fyrverkerierna och loopar tills vinnarskärmen lämnas.
- Tärningsknappen **🎲** har fått ett nytt originalproducerat 48 kHz stereo scramble/shuffle-ljud som spelas när alla sex kategorier slumpas om.
- Fel svar använder nu ett nytt djupt, sorgset **BEEE–BOOOP**-ljud med boat-horn/brass-karaktär, subbas och kort rumsklang.
- Menymusik, Galaxy Launch, rundslut och Finalens 30/45/60-sekundersmusik från 0.10 är oförändrade.
- Frågebanken, svårighetslägena, poängsystemet och sparformatet är oförändrade.

## Frågebanken från 0.6

- 200 kategorier × fem nivåer × fem alternativ = 5 000 ordinarie ledtrådar.
- 120 separata finalledtrådar.
- De 100 nya kategorierna använder samma poolstruktur som tidigare: fem slumpbara ledtrådar på varje svårighetsnivå.
- Språkpassningen undviker onödig upprepning av kategoriord och använder naturliga pronomen för personer. I de 100 nya kategorierna börjar ingen ledtråd med svaret i formen Vem är med Den/Denna/Det/Detta.
- Huvudfacit och registrerade alias kontrolleras mellan hela ordinarie banken och finalpoolen. Därutöver har en separat semantisk kontroll gjorts för stavningsvarianter och uppenbara alias som den exakta validatorn inte fångar.
- I Normal dras en ledtråd från respektive nivåpool. Lätt och Svår använder samma mappning som i 0.9. Det dragna innehållet sparas med partiet och bevaras vid omladdning.
- Sex kategorier per omgång. Byte tillåts före första öppnade ledtråden. Även bortbytta kategorier spärras i senare omgångar; vid många byten reserveras kategorier till återstående omgångar.
- Äldre sparade partier behåller redan dragna ledtrådar. Starta ett nytt parti för att använda hela 0.6-banken.

0.11 bygger vidare på den validerade 0.6-banken och svårighetslogiken från 0.9. Frågebanken och sparformatet är oförändrade; äldre partier är fortsatt bakåtkompatibla och får Normal som standard om svårighetsfält saknas.

## Spelregler

Tre omgångar med poäng 100–500, 200–1 000 respektive 300–1 500. Svårighetsvalet styr vilken nivåpool varje ruta hämtar från, medan rutans poängvärde är oförändrat. Svarstider: 5/10/20/30 sekunder; finaltid: 30/45/60 sekunder.

Spelledaren väljer vem som försöker svara. Fel svar och utgången svarstid ger minuspoäng. Övriga spelare får försöka en gång var med ny tid. Inget svar stänger rutan utan ytterligare poängändring. Senaste bedömningen kan ångras. Håll inne ett spelarnamn för poängkorrigering; Enter eller mellanslag fungerar också.

En dold dubbelchans per omgång med satsningsutrymme upp till 1 500 vid noll eller negativ poäng. Endast spelare med positiv poäng deltar i finalen; minsta satsning är 1. Lika slutpoäng ger delad seger. Tider pausas vid dold flik och återupptagning. Parti och ljudval lagras lokalt i webbläsaren. Finalmusiken följer paus/fortsätt på timern, och vinnarens musik/fyrverkerier fortsätter tills vinnarskärmen lämnas.

## Kod och återställning

Mappen dist är den färdiga webbplatsen och innehåller alla bilder. .openai/hosting.json pekar på det befintliga Sites-projektet. Skapa inget nytt projekt vid återställning.

Redigerbara ledtrådar finns i bank-source. Varje kategori har 25 rader grupperade fem och fem efter nivå. Kör `node build-bank.cjs` efter ändring för att skapa `dist/data.js`. Granskningsmetod finns i `review/EDITORIAL.md`.

## Tester

Kör följande från projektmappen med Node.js och Git:

    node build-bank.cjs
    node test.cjs
    node effects-test.cjs
    node difficulty-test.cjs
    node variation-test.cjs

Det riktade svårighetstestet (`difficulty-test.cjs`) genererar 1 000 partier och 3 000 spelplaner för Lätt/Normal/Svår, jämför dessutom 100 Normal-partier direkt med 0.8 och testar sparfilsbakåtkompatibilitet. Det äldre fulla variationstestet spelar 1 000 hela partier med 90 000 ordinarie rutor och 6 000 kategoribyten. Testet kräver att alla 5 000 ordinarie alternativ och alla 120 finaler förekommer i körningen. Det kontrollerar även extrema mängder kategoribyten, omladdning och kompatibilitet med ursprungsversionens sparade partier. Det senare kräver Git-historiken som medföljer säkerhetskopian. Resultat finns i review/.

Visuellt webbläsartest omfattar start, kategoribyte, öppnad ledtråd, facit och omladdning. På iPhone/Safari börjar huvudmenymusiken efter den första användarinteraktionen, enligt webbläsarens regler för ljudautoplay. Test på fysisk iPhone återstår. Svårighet är redaktionellt bedömd; provspel med målgruppen behövs för ytterligare kalibrering. Alla 5 120 ledtrådar har inte var för sig verifierats mot externa källor.

Spelmeny → Testverktyg låter spelledaren hoppa till senare omgångar. Vid innehållsfeedback: ange kategori, poängnivå och hela ledtråden.
