function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("MentalImage")

  // ここにdrawブロックから参照されるグローバル定数を定義する
  p1 = [], p2 = []
  for (let i = 0; i < 10000; i++) {
    p1[i] = {
      rotate: random(360),
      bitmap: random([
        BITMAP.SMILE, BITMAP.SMILY_FACE, BITMAP.TEZOS, BITMAP.VIDEO2, BITMAP.ERROR,
        BITMAP.CURSOR_NORMAL_SELECT, BITMAP.CURSOR_LINK_SELECT, BITMAP.CURSOR_BUSY,
        BITMAP.INVADER_SQUID, BITMAP.INVADER_CRAB, BITMAP.INVADER_OCTOPUS,
        BITMAP.GLIDER, BITMAP.SPACESHIP
      ]),
      x: random(),
      y: random(),
      pixelSize: random(1, 5),
      strokeColor: choseRandomColorFromPalette(),
      fillColor: choseRandomColorFromPalette(),
      isSlashEnabled: dice(8),
      isBackSlashEnabled: dice(8),
    }
    p2[i] = {
      x: random(),
      y: random(),
      digit: floor(random(10)),
      scale: random(1, 5),
      strokeColor: choseRandomColorFromPalette(),
      fillColor: choseRandomColorFromPalette(),
    }
  }
}

function windowResized() { draw() }

function draw() {
  createCanvasByAR(AR.W1_H1)
  FRAME_WIDTH = min(width, height) / 25

  {
    strokeCap(SQUARE) // ROUND, SQUARE, PROJECT
    strokeJoin(BEVEL) // MITER, BEVEL, ROUND
    strokeWeight(FRAME_WIDTH / 10)
    rectMode(CENTER) // CENTER, CORNERS
    textAlign(CENTER, CENTER)
  }

  {
    addBackground(WHITE, false)
    addForeground()
    addFrame(WHITE, BLACK, FRAME_WIDTH)
    // addSignature("Rayroot", coveredByYourGrace, WHITE)
    addPaperTexture(true, true, false)
    fxpreview()
  }

  function addForeground() {
    for (let i = 0; i < 10000; i++) {
      rotateCallback(p1[i].rotate, () => {
        drawPixelArt(
          p1[i].bitmap,
          p1[i].x * width, p1[i].y * height,
          FRAME_WIDTH / p1[i].pixelSize,
          p1[i].strokeColor, p1[i].fillColor,
          p1[i].isSlashEnabled, p1[i].isBackSlashEnabled
        )
        draw7SegDisp(
          p2[i].x * width, p2[i].y * height,
          p2[i].digit, FRAME_WIDTH / p2[i].scale,
          p2[i].strokeColor, p2[i].fillColor
        )
      })
    }
  }
}

function keyTyped() { if (key === 's') saveCanvas(TITLE + "_" + SEED) }