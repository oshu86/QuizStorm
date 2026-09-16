# QuizStorm – roterande 3D-punktglob

Detta paket innehåller en riktig 360°-glob som byggs av vita punkter på land.
Den använder WebGL direkt och behöver därför inget externt 3D-bibliotek eller
3D-program.

Version 1.1 korrigerar globens geografiska öst–väst-orientering så att
landmassorna inte visas spegelvända.

## Testa globen

Öppna mappen i en lokal webbserver och gå sedan till adressen som visas:

```bash
python -m http.server 8000
```

Öppna `http://localhost:8000/` i webbläsaren. Att dubbelklicka direkt på
`index.html` fungerar inte alltid eftersom webbläsare begränsar lokala
JavaScript-moduler och bildfiler.

## Lägg in den i QuizStorm

Lägg `quizstorm-globe.js` och `landmask.png` i samma mapp i projektet. Lägg
sedan till detta i HTML-koden:

```html
<quizstorm-globe
  id="board-globe"
  rotation-seconds="140"
  initial-longitude="15"
  point-count="52000"
  pulse="0.055"
  opacity="0.9"
  size="0.9"
></quizstorm-globe>

<script type="module" src="./quizstorm-globe.js"></script>
```

Lägg globen bakom spelplanen med CSS:

```css
#board-globe {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.game-board {
  position: relative;
  z-index: 1;
}
```

## Inställningar

| Attribut | Standard | Funktion |
| --- | ---: | --- |
| `rotation-seconds` | `140` | Sekunder för ett helt varv. |
| `initial-longitude` | `15` | Longitud som visas i mitten vid start. |
| `point-count` | `52000` | Antal punkter som provas över hela sfären. |
| `pulse` | `0.055` | Styrkan på den gemensamma ljuspulsen. |
| `opacity` | `0.9` | Globens genomskinlighet. |
| `size` | `0.9` | Globens storlek i sin behållare. |
| `paused` | – | Lägg till attributet för en stillastående glob. |

Globen respekterar automatiskt användarens inställning för reducerad rörelse.
Animationen pausas också när globen inte längre syns på skärmen.

## Filer

- `index.html` – fristående widescreen-demo.
- `quizstorm-globe.js` – återanvändbar WebGL-komponent.
- `landmask.png` – transparent equirektangulär landmask, 2048 × 1024 px.
- `preview.png` – stillbild som visar globens startvy i 16:9.
- `tools/build_landmask.py` – återskapar masken från källdatan.
- `tools/render_preview.py` – skapar stillbilden med samma projektionsmatematik.
- `source/ne_50m_land.geojson` – geografisk källdata.

Landkonturerna kommer från Natural Earth 1:50m och är public domain.
