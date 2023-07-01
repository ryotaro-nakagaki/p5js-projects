function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("Digits")

  // ここにdrawブロックから参照されるグローバル定数を定義する

}

function windowResized() { draw() }

function draw() {
  createCanvasByAR(AR.W1_H1)
  FRAME_WIDTH = min(width, height) / 25

  {
    stroke(WHITE) // BLACK, WHITE, mainColor, complementColor
    fill(mainColor) // BLACK, WHITE, mainColor, complementColor
    strokeCap(SQUARE) // ROUND, SQUARE, PROJECT
    strokeJoin(BEVEL) // MITER, BEVEL, ROUND
    strokeWeight(FRAME_WIDTH / 10)
    rectMode(CENTER) // CENTER, CORNERS
    textAlign(CENTER, CENTER)
  }

  {
    addBackground(BLACK, false)
    addForeground()
    addFrame(WHITE, WHITE, FRAME_WIDTH)
    // addSignature("rayroot", coveredByYourGrace, WHITE)
    addPaperTexture()
    fxpreview()
  }

  function addForeground() {
    translateCallback(width / 2, height / 2, () => {
      drawPixelArt(BITMAP.VIDEO2, 0, 0, FRAME_WIDTH/2, WHITE, mainColor)
    })
  }
}

function keyTyped() { if (key === 's') saveCanvas(TITLE + "_" + SEED) }