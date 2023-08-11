function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("Spaceship")

  // ここにdrawブロックから参照されるグローバル定数を定義する
  params = {
    bgFillcolor: choseRandomColorFromPalette(),
    bgStrokecolor: choseRandomColorFromPalette(),
    frameFillColor: choseRandomColorFromPalette(),
    frameStrokeColor: choseRandomColorFromPalette(),
    bitmap: choseRandomBitmap(),
    fgStrokeColor: choseRandomColorFromPalette(),
    fgFillColor: choseRandomColorFromPalette(),
    isSlashEnabled: dice(2),
    isBackSlashEnabled: dice(2)
  }
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
    addBackground(params.bgFillcolor, params.bgStrokecolor, true)
    addForeground()
    addFrame(params.frameFillColor, params.frameStrokeColor, FRAME_WIDTH)
    // addSignature("Rayroot", coveredByYourGrace, WHITE)
    addPaperTexture(true, true, false)
    fxpreview()
  }

  function addForeground() {
    translateCallback(width / 2, height / 2, () => {
      drawPixelArt(
        params.bitmap,
        0, 0,
        FRAME_WIDTH / 2,
        params.fgStrokeColor,
        params.fgFillColor,
        params.isSlashEnabled,
        params.isBackSlashEnabled
      )
    })
  }
}

function keyTyped() { if (key === 's') saveCanvas(TITLE + "_" + SEED) }