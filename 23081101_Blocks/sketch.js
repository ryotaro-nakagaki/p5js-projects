function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("Spaceship")

  // ここにdrawブロックから参照されるグローバル定数を定義する
}

function windowResized() { draw() }

function draw() {
  createCanvasByAR(AR.W1_H1)
  FRAME_WIDTH = min(width, height) / 25

  {
    strokeCap(SQUARE) // ROUND, SQUARE, PROJECT
    strokeJoin(BEVEL) // MITER, BEVEL, ROUND
    strokeWeight(FRAME_WIDTH / 8)
    rectMode(CENTER) // CENTER, CORNERS
    textAlign(CENTER, CENTER)
  }

  {
    addBackground(
      choseRandomColorFromPalette(),
      choseRandomColorFromPalette(),
      true, true
    )
    addForeground()
    addFrame(
      choseRandomColorFromPalette(),
      choseRandomColorFromPalette(),
      FRAME_WIDTH
    )
    // addSignature("Rayroot", coveredByYourGrace, WHITE)
    addPaperTexture(true, true, true, false)
    fxpreview()
  }

  function addForeground() {
    translateCallback(0, 0, () => {
      for (let i = 0; i < 10; i++) {
        const bitmap = choseRandomBitmap()
        const x = random(width)
        const y = random(height)
        const pixelSize = FRAME_WIDTH / random(1, 3)

        const r = random([-1, 1])
        const s = random([-1, 1])

        for (let i = 0; i < 200; i += 5) {
          drawPixelArt(
            bitmap,
            x + r * i,
            y + s * i,
            pixelSize + i,
            BLACK,
            choseRandomColorFromPalette(),
            dice(4),
            dice(4)
          )
        }
      }
    })
  }
}

function keyTyped() { if (key === 's') saveCanvas(TITLE + "_" + SEED) }