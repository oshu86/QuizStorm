# QuizStorm 0.5 – innehållsgranskning

Banken är skriven för spelets Jeopardy-format: beskrivande påståenden och facit i frågeform. Varje kategori har fem på varandra följande grupper om fem alternativ. Gruppen anger svårighetsnivå, inte omgång. Källmaterialet finns i bank-source; build-bank.cjs skapar den spelbara filen dist/data.js.

## Genomförd kontroll

- 100 kategorier, 500 nivåpooler med fem alternativ vardera, 2 500 ordinarie ledtrådar och 80 finalledtrådar.
- Alla publicerade ledtrådar är påståenden. Egennamn och verkstitlar kan ingå som naturliga hintar. Facit är formulerade som Vad är, Vem är eller Vilka är.
- Samtliga huvudfacit och registrerade alternativa namn kontrolleras för dubbletter mellan kategorier och mot finalpoolen.
- Hela facit och registrerade alias söks även inne i ledtrådens ord för namnvarianter. För en- och tvåbokstavsnamn används ordgränser; annars skulle exempelvis te matcha inuti vanliga ord.
- Svenska å, ä och ö skiljs från a och o: trädet al är inte fisken ål. Kända stavningsvarianter registreras uttryckligen.
- Sakuppgifter och svårighetsordning har granskats vid skrivning och genom riktade efterkontroller. Det är en redaktionell bedömning, inte ett empiriskt mått på hur svår varje ledtråd är för alla åldersgrupper.
- Rörliga uppgifter som följarantal och nuvarande rekord undviks till förmån för daterade prestationer och stabila beskrivningar.

## Externa källkontroller

Nedan finns använda referenser för riktade faktakontroller. Detta är inte ett påstående om att varje ledtråd har verifierats separat mot en extern källa.

- [NASA: planeter](https://science.nasa.gov/solar-system/planets/) och [solsystemet](https://science.nasa.gov/solar-system/solar-system-facts/): planeternas ordning och klassificering.
- [Royal Society of Chemistry: kisel](https://periodic-table.rsc.org/element/14/silicon) och [fosfor](https://periodic-table.rsc.org/element/15/phosphorus): användningsområden och kemiska tecken.
- [Historiska museet: gudarnas attribut](https://vikingar.historiska.se/objects.php?e=&l=sv&showcase=52625e22-153d-4250-b3b2-3a6920dfc474): nordiska gudagestalter.
- [1177: matsmältningsorganen](https://www.1177.se/liv--halsa/sa-fungerar-kroppen/matsmaltningsorganen/): organ och grundläggande funktioner.
- [SMHI: inversion](https://www.smhi.se/kunskapsbanken/meteorologi/atmosfarens-cirkulation/inversion) och [halofenomen](https://www.smhi.se/kunskapsbanken/meteorologi/halofenomen): väderbegrepp.
- [Naturhistoriska riksmuseet: fossil](https://www.nrm.se/fakta-om-naturen/fossil): bevarade lämningar och evolution.
- [Naturvårdsverket: invasiva främmande arter](https://www.naturvardsverket.se/amnesomraden/invasiva-frammande-arter): betydelsen av begreppet.
- [Riksdagen: misstroendeförklaring](https://www.riksdagen.se/sv/sa-fungerar-riksdagen/riksdagens-uppgifter/kontrollerar-regeringen/misstroendeforklaring/): grundläggande parlamentarisk innebörd.
- [Sveriges Domstolar: juridisk ordlista](https://www.domstol.se/domstolsverket/om-sveriges-domstolar/for-dig-som-aktor-i-domstol/stod-for-aktorer-i-domstol/ordlistor/juridisk-ordlista/): rättsliga begrepp.
- [Eurovision: Oslo 1996](https://www.eurovision.com/eurovision-song-contest/oslo-1996/oslo-1996-final/): One More Time och Den vilda.
- [Sveriges Radio: Matkoma](https://www.sverigesradio.se/artikel/mat-influencerns-lunchknep-har-kan-du-hitta-en-billig-buffe): Adam Åstrand och Anton Lundell. Ett felaktigt efternamn i arbetsmaterialet rättades.
- [Sveriges Radio: IJustWantToBeCool](https://www.sverigesradio.se/artikel/6450299): gruppmedlemmar och släktskap.
- [UIPM:s guide till Paris 2024](https://www.uipmworld.org/sites/default/files/2024_uipm_media_guide_paris_2024_olympic_edition.pdf): modern femkamp och förändringen av programmet. Ledtråden undviker en tidskänslig lista över grenarna.

## Fortsatt speltest

Särskilt värdefull återkoppling är kategori, nivå, visad ledtråd och om den upplevdes tvetydig, för lätt eller för svår. De två första nivåerna ska kännas lättillgängliga; de två högsta ska kräva mer kunskap eller eftertanke. Ingen automatisk textbedömning används.
