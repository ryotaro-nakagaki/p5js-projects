function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("MentalImage")

  // ここにdrawブロックから参照されるグローバル定数を定義する
  params = []
  for (let i = 0; i < 250; i++) {
    params[i] = [
      random([
        BITMAP.SMILE, BITMAP.SMILY_FACE, BITMAP.TEZOS, BITMAP.VIDEO2, BITMAP.ERROR,
        BITMAP.CURSOR_NORMAL_SELECT, BITMAP.CURSOR_LINK_SELECT, BITMAP.CURSOR_BUSY,
        BITMAP.INVADER_SQUID, BITMAP.INVADER_CRAB, BITMAP.INVADER_OCTOPUS,
        BITMAP.GLIDER, BITMAP.SPACESHIP
      ]),
      random(),
      random(),
      choseRandomColorFromPalette(),
      dice(8),
      dice(8),
      random(),
      random(),
      random(),
      choseRandomColorFromPalette()
    ]
  }
}

function windowResized() { draw() }

function draw() {
  createCanvasByAR(AR.W1_H1)
  FRAME_WIDTH = min(width, height) / 25

  {
    strokeCap(SQUARE) // ROUND, SQUARE, PROJECT
    strokeJoin(BEVEL) // MITER, BEVEL, ROUND
    strokeWeight(FRAME_WIDTH / 20)
    rectMode(CENTER) // CENTER, CORNERS
    textAlign(CENTER, CENTER)
  }

  {
    addBackground(WHITE, false)
    addForeground()
    addFrame(WHITE, BLACK, FRAME_WIDTH)
    // addSignature("Rayroot", coveredByYourGrace, WHITE)
    addPaperTexture()
    fxpreview()
  }

  function addForeground() {
    translateCallback(0, 0, () => {
      for (let i = 0; i < 250; i++) {
        drawPixelArt(
          params[i][0], width * params[i][1], height * params[i][2],
          FRAME_WIDTH * 0.4, BLACK, params[i][3], params[i][4], params[i][5]
        )
        draw7SegDisp(
          width * params[i][6], height * params[i][7], floor(10 * params[i][8]),
          FRAME_WIDTH * 0.4, BLACK, params[i][9]
        )
      }
    })
  }
}

function keyTyped() { if (key === 's') saveCanvas(TITLE + "_" + SEED) }