


function setup() {
  // 作品タイトルを設定
  init("PatreonCoverImg", false)

  // ここにdrawブロックから参照されるグローバル定数を定義する
  p1 = []
  numPixelArt = 1000
  for (let i = 0; i < numPixelArt; i++) {
    p1[i] = {
      rotate: 0, //random(360),
      bitmap: random([
        BITMAP.SMILE, BITMAP.SMILY_FACE, BITMAP.TEZOS, BITMAP.VIDEO2, BITMAP.ERROR,
        BITMAP.CURSOR_NORMAL_SELECT, BITMAP.CURSOR_LINK_SELECT, BITMAP.CURSOR_BUSY,
        BITMAP.INVADER_SQUID, BITMAP.INVADER_CRAB, BITMAP.INVADER_OCTOPUS,
        BITMAP.GLIDER, BITMAP.LIGHTWEIGHT_SPACESHIP, BITMAP.MIDDLEWEIGHT_SPACESHIP,
        BITMAP.HEAVYWEIGHT_SPACESHIP, BITMAP.OMOCHISKY_LOGO
      ]),
      x: random(),
      y: random(),
      pixelSize: random(1 / 10, 4),
      strokeColor: choseRandomColorFromPalette(true, true, true, true, true, true),
      fillColor: choseRandomColorFromPalette(true, true, true, true, true, true),
      isSlashEnabled: dice(3),
      isBackSlashEnabled: dice(3),
    }
  }

  ar = AR.W1_H1 // chooseRandomAR()
}

function windowResized() { draw() }

function draw() {
  // createCanvasByAR(ar)
  createCanvas(2480, 520)
  FRAME_WIDTH = min(width, height) / 20

  {
    strokeCap(SQUARE) // ROUND, SQUARE, PROJECT
    strokeJoin(BEVEL) // MITER, BEVEL, ROUND
    strokeWeight(FRAME_WIDTH / 5)
    rectMode(CENTER) // CENTER, CORNERS
    textAlign(CENTER, CENTER)
  }

  {
    addBackground(
      choseRandomColorFromPalette(true, true, true, true, true, true),
      TRANSP,
      false,
      random(width),
      random(height),
      false
    )
    addForeground()
    addFrame(WHITE, BLACK, FRAME_WIDTH)
    // addSignature("Rayroot", coveredByYourGrace, BLACK)
    addPaperTexture(true, true, true, true)
    // fxpreview()
  }

  function addForeground() {
    for (let i = 0; i < numPixelArt; i++) {
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