function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("Spaceship")

  // ここにdrawブロックから参照されるグローバル定数を定義する
  params = {
    bgFillcolor: choseRandomColorFromPalette(),
    frameFillColor: choseRandomColorFromPalette(),
    frameStrokeColor: choseRandomColorFromPalette(),
    fillColor: choseRandomColorFromPalette()
  }
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
    addBackground(params.bgFillcolor, false)
    addForeground()
    addFrame(params.frameFillColor, params.frameStrokeColor, FRAME_WIDTH)
    // addSignature("Rayroot", coveredByYourGrace, WHITE)
    addPaperTexture(true, true, false)
    fxpreview()
  }

  function addForeground() {
    translateCallback(width / 2, height / 2, () => {
      drawPixelArt(
        random([
          BITMAP.LIGHTWEIGHT_SPACESHIP,
          BITMAP.MIDDLEWEIGHT_SPACESHIP,
          BITMAP.HEAVYWEIGHT_SPACESHIP
        ]),
        0, 0,
        FRAME_WIDTH * 2, BLACK,
        params.fillColor,
        dice(2), dice(2)
      )
    })
  }
}

function keyTyped() { if (key === 's') saveCanvas(TITLE + "_" + SEED) }