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
    strokeWeight(FRAME_WIDTH / 16)
    rectMode(CENTER) // CENTER, CORNERS
    textAlign(CENTER, CENTER)
  }

  {
    addBackground(BLACK, mainColor, BLACK, true, false)
    addForeground()
    addFrame(choseRandomColorFromPalette(), choseRandomColorFromPalette(), FRAME_WIDTH)
    // addSignature("Rayroot", coveredByYourGrace, WHITE)
    addPaperTexture(true, true, true)
    fxpreview()
  }

  function addForeground() {
    translateCallback(width / 2, height / 2, () => {
      for (let i = 0; i < 100; i++) {
        drawPixelArt(
          choseRandomBitmap(),
          randomGaussian(0, 100),
          randomGaussian(0, 100),
          FRAME_WIDTH / 3,
          BLACK,
          choseRandomColorFromPalette(),
          dice(4),
          dice(4)
        )
      }
    })
  }
}

function keyTyped() { if (key === 's') saveCanvas(TITLE + "_" + SEED) }