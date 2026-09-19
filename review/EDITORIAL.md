# QuizStorm 0.27 – granskning av ledtrådsbanken

Granskad 18 september 2026. Utgångspunkt: den lokala versionen 0.26.

## Resultat

803 poster har ändrats i 99 kategorier eller finalämnen. 68 av dessa har ändrat facit, svarstyp eller alternativa namn. Banken innehåller fortfarande 5 000 ordinarie frågor i 200 kategorier samt 120 finalfrågor. Varje kategori har fem nivåer med fem alternativ per nivå.

Frågemålet skrivs ut där det behövs: exempelvis ”detta område”, ”denna offensiv”, ”denna Disneyfilm”, ”denna ordklass” eller ”denna yrkesperson”. Befintliga ledtrådar som redan anger vad som söks behöver inte samma standardfras. Personnamn kan ha ”Vem är”, även när ledtråden börjar med ”Denne”.

## Några ändringar

| Facit | Ändring |
|---|---|
| Julfreden 1914 | Spontan, inofficiell vapenvila på delar av västfronten. Fotboll anges bara för vissa platser. |
| Ingenmansland | Ett uttryckligt område mellan skyttegravarna, sönderskjutet och fyllt av taggtråd. |
| Slaget vid Tannenberg | Ryska andra armén, inte två ryska arméer. |
| Gamal Abdel Nasser | Presidenten nationaliserade kanalbolaget; den tidigare omvända tidsföljden är borttagen. |
| Smittkoppor | Facit är sjukdomen som ledtråden efterfrågar, inte ”smittkoppsutrotningen”. |
| De fyra färgernas sats | Ledtråden söker nu själva satsen i stället för antalet färger. |
| Disneyfilmer och flera romaner | Titeln efterfrågas uttryckligen, så att en beskrivning av en figur inte kan misstas för en personfråga. |
| Genetik och natur | Exempelvis ”överkorsning”, ”turbidit”, ”allelopati” och ”grodyngel” har fått etablerade benämningar. |

Uppenbara semantiska dubbletter har ersatts med andra frågor i samma kategori, bland annat Anne/Anne Princess Royal, freden i Tilsit/Tilsitfreden, kubmanet/box jellyfish, UTM-systemet/UTM, gavial/gharial och Akira Kurosawa/Akira Kurosawa-regissören. Alla ersättningar behåller sin plats i kategori och nivåpool. Svårighetsgraden är redaktionellt uppskattad, inte kalibrerad med spelardata.

## Omfattning och begränsning

Hela banken med 5 120 poster har gått igenom maskinell kontroll av struktur, facitformat, exakta namn-/aliasdubbletter och om ledtråden innehåller sitt eget registrerade svar. En textsökning har även använts för att hitta otydliga frågemål, misstänkta personformer och närliggande svar.

Den redaktionella genomgången och externa faktakontrollen är riktad mot upptäckta problem, med särskild tonvikt på krigshistoria, film-/boktitlar, grundbegrepp och konstgjorda facit. Det är inte en oberoende källverifiering av samtliga 5 120 sakuppgifter. Automatiska kontroller kan inte bevisa entydighet eller upptäcka alla översatta dubbletter. Rapporten ska därför inte tolkas som att hela banken är garanterat felfri.

Den fullständiga ändringslistan med tidigare och ny text finns i editorial-changes-027.json. De tidigare generella granskningspåståendena har sparats separat i EDITORIAL-0.6-historik.md och beskriver inte verifieringen i denna version.

## Faktakällor som använts

- Julfreden och dess lokala karaktär: [National Army Museum](https://ww1.nam.ac.uk/1331/news/christmas-truce/).
- Tannenberg: [1914–1918 Online, Tannenberg, Battle of](https://encyclopedia.1914-1918-online.net/pdf/1914-1918-Online-tannenberg_battle_of-2017-12-21-V1.1.pdf).
- Nasser och nationaliseringen: [Suez Canal Authority, beslutet 26 juli 1956](https://www.suezcanal.gov.eg/English/About/CanalTreatiesAndDecrees/Pages/NationalizationDecree.aspx).
- Challenger: [NASA](https://www.nasa.gov/image-article/remembering-space-shuttle-challenger/).
- Human Genome Project: [NHGRI](https://www.genome.gov/about-genomics/educational-resources/fact-sheets/human-genome-project).
- Klimatrörelsens start: [Fridays for Future](https://fridaysforfuture.org/).
- Smittkoppsutrotningen: [WHO:s deklaration 1980](https://tdr.who.int/home/our-work/global-engagement/WHA33-3).
- Prins Edward: [Brittiska kungahuset](https://www.royal.uk/duke/edinburgh).
- Wagram och Malmaison: [Fondation Napoléon, Wagram](https://www.napoleon.org/en/history-of-the-two-empires/timelines/the-battle-of-wagram/), [Museo Napoleonico, Joséphine](https://www.museonapoleonico.it/en/percorsi/percorsi_per_sale/sale_i_e_ii_il_primo_impero/l_imperatrice_giuseppina).
- Élyséefördraget: [Frankrikes utrikesministerium](https://www.diplomatie.gouv.fr/en/the-ministry-in-action/ensuring-the-presence-of-french-culture/franco-german-cooperation/the-elysee-treaty-in-six-questions).
- Gdańskavtalet: [Avtalstexten, Friedrich-Ebert-Stiftung](https://library.fes.de/pdf-files/netzquelle/c90-01995.pdf).
- Schengenkonventionen: [EU-rådet](https://www.consilium.europa.eu/fr/policies/schengen-area/).
- Fulda Gap: [US Army V Corps](https://www.vcorps.army.mil/History/Cold-War/).
- RNA-splitsning: [NHGRI](https://www.genome.gov/about-genomics/educational-resources/fact-sheets/ribonucleic-acid-fact-sheet).
- Valfall: [NOAA](https://oceanservice.noaa.gov/facts/whale-fall.html).
- Heliopausen: [NASA](https://www.nasa.gov/solar-system/the-voyage-to-interstellar-space/).
- Intel 4004: [Intel](https://www.intel.com/content/www/us/en/newsroom/opinion/chip-that-changed-world.html).
- Satoshi Kon: [BFI](https://bfidatadigipres.github.io/anime/2022/05/02/perfect-blue/).
- Henry Every: [History](https://www.history.com/articles/henry-everys-bloody-pirate-raid-320-years-ago).

## Användning

Starta ett nytt parti för att spela med den uppdaterade banken. Redan dragna frågor i ett sparat parti behåller sin gamla text. Inga sparfiler har raderats och formatet för sparade partier har inte ändrats.

## Utförda kontroller för 0.27

Bankbygget och de fem befintliga testerna för spelregler, ljud, atmosfär, menyanimation och resursfiler passerade. Samtliga kategori-ID:n och nivåpositioner bevarades. Spelkoden är identisk med 0.26 bortsett från versionsmärkningen. Alla 60 resursfiler är byte-identiska.

De äldre historikbaserade difficulty-test.cjs och variation-test.cjs kördes inte eftersom deras tidigare Git-commits saknas. Inget nytt visuellt webbläsartest eller fysiskt iPhone-test har gjorts för denna textuppdatering.
