function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("MentalImage", false)

  // ここにdrawブロックから参照されるグローバル定数を定義する
  p1 = []
  for (let i = 0; i < 10000; i++) {
    p1[i] = {
      rotate: random(360),
      bitmap: random([
        BITMAP.SMILE, BITMAP.SMILY_FACE, BITMAP.TEZOS, BITMAP.VIDEO2, BITMAP.ERROR,
        BITMAP.CURSOR_NORMAL_SELECT, BITMAP.CURSOR_LINK_SELECT, BITMAP.CURSOR_BUSY,
        BITMAP.INVADER_SQUID, BITMAP.INVADER_CRAB, BITMAP.INVADER_OCTOPUS,
        BITMAP.GLIDER, BITMAP.LIGHTWEIGHT_SPACESHIP, BITMAP.MIDDLEWEIGHT_SPACESHIP,
        BITMAP.HEAVYWEIGHT_SPACESHIP
      ]),
      x: random(),
      y: random(),
      pixelSize: random(.25, 5),
      strokeColor: choseRandomColorFromPalette(false),
      fillColor: choseRandomColorFromPalette(false),
      isSlashEnabled: dice(2),
      isBackSlashEnabled: dice(2),
    }
  }

  ar = chooseRandomAR() // chooseRandomAR()
}

function windowResized() { draw() }

function draw() {
  createCanvasByAR(ar)
  FRAME_WIDTH = min(width, height) / 25

  {
    strokeCap(SQUARE) // ROUND, SQUARE, PROJECT
    strokeJoin(BEVEL) // MITER, BEVEL, ROUND
    strokeWeight(FRAME_WIDTH / 10)
    rectMode(CENTER) // CENTER, CORNERS
    textAlign(CENTER, CENTER)
  }

  {
    addBackground(
      choseRandomColorFromPalette(false),
      choseRandomColorFromPalette(false),
      true,
      random(width),
      random(height),
      true
    )
    addForeground()
    addFrame(
      choseRandomColorFromPalette(true),
      choseRandomColorFromPalette(true),
      FRAME_WIDTH
    )
    // addSignature("Rayroot", coveredByYourGrace, WHITE)
    addPaperTexture(true, true, true)
    // fxpreview()
  }

  function addForeground() {
    for (let i = 0; i < 10000; i++) {
      rotateCallback(p1[i].rotate, () => {
        drawPixelArt(
          p1[i].bitmap,
          p1[i].x * width,
          p1[i].y * height,
          FRAME_WIDTH / p1[i].pixelSize,
          p1[i].strokeColor, p1[i].fillColor,
          p1[i].isSlashEnabled, p1[i].isBackSlashEnabled
        )
      })
    }
  }
}

function keyTyped() {
  if (key === 's') saveCanvas(TITLE + "_" + SEED, "png") // "png" or "jpg"
  if (key === 'g') saveGif(TITLE + "_" + SEED, 5 * 1 / getTargetFrameRate())
}