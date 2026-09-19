# QuizStorm 0.6 – innehållsgranskning

Banken är skriven för spelets frågeformat: beskrivande påståenden och facit i frågeform. Varje kategori har fem på varandra följande grupper om fem alternativ. Gruppen anger svårighetsnivå, inte omgång. Källmaterialet finns i `bank-source`; `build-bank.cjs` skapar den spelbara filen `dist/data.js`.

## Genomförd kontroll

- 200 kategorier, 1 000 nivåpooler med fem alternativ vardera, 5 000 ordinarie ledtrådar och 120 finalledtrådar.
- Varje kategori har exakt 25 ordinarie alternativ: fem per svårighetsnivå.
- Facit måste följa `Vad är`, `Vem är` eller `Vilka är` och ledtrådarna får inte innehålla sitt eget registrerade facit eller alias.
- Huvudfacit och registrerade alternativa namn kontrolleras maskinellt för exakta dubbletter mellan kategorier och mot finalpoolen.
- En separat semantisk kontroll används för uppenbara alias som skiljer sig genom exempelvis bindestreck, bestämd form, språkvariant eller geografiskt suffix. Under 0.6-rensningen ersattes bland annat krockar av typen Öresundsbron/Øresundsbron, Ruwenzori/Ruwenzoribergen och termohalin/thermohalin cirkulation.
- Falska eller konstgjorda “fällfrågor” som inte hade ett verkligt etablerat facit har tagits bort och ersatts med riktiga kunskapsfrågor.
- Personfrågor i de 100 nytillagda kategorierna har kontrollerats separat: ingen `Vem är`-ledtråd börjar med Den, Denna, Det eller Detta.
- Rörliga uppgifter som följarantal och nuvarande rekord undviks där det är möjligt till förmån för daterade prestationer och stabila beskrivningar.
- Svårighetsordningen är redaktionellt bedömd. De två första nivåerna ska vara lättillgängliga, nivå tre medel och nivå fyra–fem tydligt svårare utan att medvetet bli obskyra specialistfrågor.

## Särskilda format

- **Ordspråk** använder fyll-i-slutet-format. Ledtråden ger början av ordspråket och facit är den saknade avslutningen.
- Blandade kategorier kan ange svarstyp per rad med `[VEM]`, `[VAD]` eller `[VILKA]` så att personer inte tvingas till `Vad är`.
- Kategoriord upprepas inte som standard i ledtråden när sammanhanget redan framgår av kategoriöverskriften.

## Automatiska tester

- `build-bank.cjs`: antal kategorier/frågor, poolstorlek, svarformat, exakta facit/aliasdubbletter och facitläckage.
- `test.cjs`: centrala spelregler, poäng, timers, dubbelchans, rundor och final.
- `effects-test.cjs`: ljud/fyrverkerier och städning av effekter.
- `variation-test.cjs`: 1 000 fulla partier, 90 000 spelade ordinarie rutor, 6 000 kategoribyten, täckning av hela banken samt omladdning och äldre sparfiler.

## Fortsatt speltest

Särskilt värdefull återkoppling är kategori, nivå, visad ledtråd och om den upplevdes tvetydig, för lätt eller för svår. Ingen automatisk textbedömning kan ersätta provspel med olika åldrar och kunskapsnivåer.
