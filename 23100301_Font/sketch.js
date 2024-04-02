function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("MentalImage", false)

  // ここにdrawブロックから参照されるグローバル定数を定義する

  ar = AR.W1_H1 // chooseRandomAR()
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
    addBackground(WHITE, BLACK, false, random(width), random(height), false)
    addForeground()
    addFrame(WHITE, BLACK, FRAME_WIDTH)
    // addSignature("Rayroot", coveredByYourGrace, WHITE)
    addPaperTexture(true, true, false)
    // fxpreview()
  }

  function addForeground() {
    stroke(BLACK)
    strokeWeight(2 * FRAME_WIDTH / 10)
    textFont(YujiSyuku)

    for (let i = 0; i < 100; i++) {
      textSize(random(100, 10000))
      fill(choseRandomColorFromPalette())

      translateCallback(random(width), random(height), () => {
        rotateCallback(random(360), () => {
          text("0xDEADBEEF", 0, 0)
        })
      })
    }

    strokeWeight(FRAME_WIDTH / 10)
  }
}

function keyTyped() {
  if (key === 's') saveCanvas(TITLE + "_" + SEED, "png") // "png" or "jpg"
  if (key === 'g') saveGif(TITLE + "_" + SEED, 5 * 1 / getTargetFrameRate())
}