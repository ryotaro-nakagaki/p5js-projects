function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("MentalImage")

  // ここにdrawブロックから参照されるグローバル定数を定義する

}

function windowResized() { draw() }

function draw() {
  createCanvasByAR(AR.W1_H1)
  FRAME_WIDTH = min(width, height) / 25

  {
    stroke(random([BLACK, WHITE, DARK_GRAY, mainColor])) // BLACK, WHITE, mainColor, complementColor
    fill(random([BLACK, WHITE, DARK_GRAY, mainColor])) // BLACK, WHITE, mainColor, complementColor
    strokeCap(SQUARE) // ROUND, SQUARE, PROJECT
    strokeJoin(BEVEL) // MITER, BEVEL, ROUND
    strokeWeight(FRAME_WIDTH / 10)
    rectMode(CENTER) // CENTER, CORNERS
    textAlign(CENTER, CENTER)
  }

  {
    addBackground(random([BLACK, WHITE, DARK_GRAY, mainColor]), false)
    addForeground()
    addFrame(
      random([BLACK, WHITE, DARK_GRAY, mainColor]),
      random([BLACK, WHITE, DARK_GRAY, mainColor]),
      FRAME_WIDTH
    )
    // addSignature("Rayroot", coveredByYourGrace, WHITE)
    addPaperTexture()
    fxpreview()
  }

  function addForeground() {
    translateCallback(0, 0, () => {
      for (let i = 0; i < 100; i++) {
        drawPixelArt(
          random([
            BITMAP.SMILE, BITMAP.CURSOR, BITMAP.HOURGRASS, BITMAP.TEZOS,
            BITMAP.INVADER_SQUID, BITMAP.INVADER_CRAB, BITMAP.INVADER_OCTOPUS,
            BITMAP.GLIDER, BITMAP.SPACESHIP, BITMAP.VIDEO2, BITMAP.ERROR,
            BITMAP.SMILY_FACE
          ]),
          random(width), random(height), FRAME_WIDTH / random(5),
          random([BLACK, WHITE, DARK_GRAY, mainColor]),
          random([BLACK, WHITE, DARK_GRAY, mainColor])
        )
      }
    })
  }
}

function keyTyped() { if (key === 's') saveCanvas(TITLE + "_" + SEED) }