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
    strokeCap(SQUARE) // ROUND, SQUARE, PROJECT
    strokeJoin(BEVEL) // MITER, BEVEL, ROUND
    strokeWeight(FRAME_WIDTH / 16)
    rectMode(CENTER) // CENTER, CORNERS
    textAlign(CENTER, CENTER)
  }

  {
    addBackground(WHITE, false)
    addForeground()
    addFrame(mainColor, BLACK, FRAME_WIDTH)
    // addSignature("Rayroot", coveredByYourGrace, WHITE)
    addPaperTexture()
    fxpreview()
  }

  function addForeground() {
    translateCallback(0, 0, () => {
      for (let i = 0; i < 500; i++) {
        drawPixelArt(
          random([
            BITMAP.SMILE, BITMAP.CURSOR, BITMAP.HOURGRASS, BITMAP.TEZOS,
            BITMAP.INVADER_SQUID, BITMAP.INVADER_CRAB, BITMAP.INVADER_OCTOPUS,
            BITMAP.GLIDER, BITMAP.SPACESHIP, BITMAP.VIDEO2, BITMAP.ERROR,
            BITMAP.SMILY_FACE
          ]),
          random(width), random(height), FRAME_WIDTH / 2, BLACK,
          random([WHITE, DARK_GRAY, GRAY, LIGHT_GRAY, mainColor, analogousColors[0], analogousColors[1]]),
          random([true, false, false])
        )

        draw7SegDisp(
          random(width), random(height), floor(random(10)), random(1 / 2),
          random([BLACK, WHITE, DARK_GRAY, GRAY, LIGHT_GRAY, mainColor, analogousColors[0], analogousColors[1]]),
          random([BLACK, WHITE, DARK_GRAY, GRAY, LIGHT_GRAY, mainColor, analogousColors[0], analogousColors[1]]),
        )
      }
    })
  }
}

function keyTyped() { if (key === 's') saveCanvas(TITLE + "_" + SEED) }