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
    addBackground(mainColor, true)
    addForeground()
    addFrame(WHITE, WHITE, FRAME_WIDTH)
    // addSignature("rayroot", coveredByYourGrace, WHITE)
    addPaperTexture()
    fxpreview()
  }

  function addForeground() {
    translateCallback(0, 0, () => {
      for (let i = 0; i < 25; i++) {
        draw7SegDisp(
          random(width), random(height),
          floor(random(10)), random(1.5),
          WHITE, TRANSP
        )
      }
    })
  }
}

function keyTyped() { if (key === 's') saveCanvas(TITLE + "_" + SEED) }