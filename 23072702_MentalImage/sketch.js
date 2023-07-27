function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("Invader")

  // ここにdrawブロックから参照されるグローバル定数を定義する

}

function windowResized() { draw() }

function draw() {
  createCanvasByAR(AR.W1_H1)
  FRAME_WIDTH = min(width, height) / 25

  {
    stroke(BLACK) // BLACK, WHITE, mainColor, complementColor
    fill(mainColor) // BLACK, WHITE, mainColor, complementColor
    strokeCap(SQUARE) // ROUND, SQUARE, PROJECT
    strokeJoin(BEVEL) // MITER, BEVEL, ROUND
    strokeWeight(FRAME_WIDTH / 10)
    rectMode(CENTER) // CENTER, CORNERS
    textAlign(CENTER, CENTER)
  }

  {
    addBackground(mainColor, false)
    addForeground()
    addFrame(WHITE, BLACK, FRAME_WIDTH)
    // addSignature("Rayroot", coveredByYourGrace, WHITE)
    addPaperTexture()
    fxpreview()
  }

  function addForeground() {
    translateCallback(0, 0, () => {
      for (let y = 0; y <= height; y += height / 10) {
        for (let x = 0; x <= width; x += width / 10) {
          drawPixelArt(
            random([BITMAP.SMILE, BITMAP.CURSOR, BITMAP.HOURGRASS, BITMAP.TEZOS, BITMAP.INVADER, BITMAP.VIDEO2, BITMAP.ERROR, BITMAP.SMILY_FACE]),
            x, y, FRAME_WIDTH / 4,
            random([BLACK, WHITE, GRAY, mainColor]),
            random([BLACK, WHITE, GRAY, mainColor])
          )
        }
      }
    })
  }
}

function keyTyped() { if (key === 's') saveCanvas(TITLE + "_" + SEED) }