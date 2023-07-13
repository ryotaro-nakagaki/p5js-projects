function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("Digits")

  // ここにdrawブロックから参照されるグローバル定数を定義する
  params = []
  for (let i = 0; i < 25; i++) {
    params[i] = [random(), random(), random(), random()]
  }
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
          params[i][0] * width,
          params[i][1] * height,
          floor(params[i][2] * 10),
          params[i][3] * FRAME_WIDTH / 25,
          WHITE, TRANSP
        )
      }
    })
  }
}

function keyTyped() { if (key === 's') saveCanvas(TITLE + "_" + SEED) }