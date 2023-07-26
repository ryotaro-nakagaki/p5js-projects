function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("Recursive")

  // ここにdrawブロックから参照されるグローバル定数を定義する

}

function windowResized() { draw() }

function draw() {
  createCanvasByAR(AR.W1_H1)
  FRAME_WIDTH = min(width, height) / 25

  {
    stroke(WHITE) // BLACK, WHITE, mainColor, complementColor
    fill(WHITE) // BLACK, WHITE, mainColor, complementColor
    strokeCap(SQUARE) // ROUND, SQUARE, PROJECT
    strokeJoin(BEVEL) // MITER, BEVEL, ROUND
    strokeWeight(FRAME_WIDTH / 10)
    rectMode(CENTER)
    textAlign(CENTER, CENTER)
  }

  {
    addBackground(mainColor, true)
    addForeground()
    addFrame(WHITE, WHITE, FRAME_WIDTH)
    // addSignature("れいるうと", yujiHentaiganaAkebono, WHITE)
    addPaperTexture()
    fxpreview()
  }

  function addForeground() {
    const count = 7
    drawRecursiveRect(0, 0, width, height, count)

    function drawRecursiveRect(x1, y1, x2, y2, count) {

      const x = random(x1, x2)
      const y = random(y1, y2)

      noiseLine(x, y1, x, y2)
      noiseLine(x1, y, x2, y)

      count--

      if (0 !== count) {
        drawRecursiveRect(x1, y1, x, y, count)
        drawRecursiveRect(x, y1, x2, y, count)
        drawRecursiveRect(x1, y, x, y2, count)
        drawRecursiveRect(x, y, x2, y2, count)
      }
    }
  }
}

function keyTyped() { if (key === 's') saveCanvas(TITLE + "#" + SEED) }