function setup() {
  // 作品タイトルを設定
  init("Untitled", false)

  // ここにdrawブロックから参照されるグローバル定数を定義する

  ar = chooseRandomAR() // chooseRandomAR()
}

function windowResized() { draw() }

function draw() {
  createCanvasByAR(ar)
  // createCanvasByResolution(RESOLUTION.TWITTER_PROFILE)

  FRAME_WIDTH = min(width, height) / 20

  {
    strokeCap(SQUARE) // ROUND, SQUARE, PROJECT
    strokeJoin(BEVEL) // MITER, BEVEL, ROUND
    strokeWeight(FRAME_WIDTH / 15)
    rectMode(CENTER) // CENTER, CORNERS
    textAlign(CENTER, CENTER)
  }

  {
    // 背景
    addBackground(
      BLACK,
      TRANSP,
      false,
      random(width),
      random(height),
      true
    )

    //前景
    addForeground()

    // 枠
    // addFrame(WHITE, BLACK, FRAME_WIDTH)

    // addSignature("Rayroot", coveredByYourGrace, BLACK)
    addPaperTexture({
      isDotEnabled: true,
      isFiberEnabled: true,
      isNoiseEnabled: true,
      isFadeEnabled: true,
      isUnevenEnabled: true,
    })
    // fxpreview()
  }

  function addForeground() {
    drawPixelArt({
      bitmap: chooseRandomBitmap(),
      x: width / 2, y: height / 2,
      pixelSize: 10,
      strokeColor: popPalletColor({
        enableWhite: true,
        enableBlack: true,
        enableGrayColors: true,
        enableMainColor: true,
        enableAnalogousColors: true,
        enableComplementColor: true,
        enableTransp: true,
      }),
      fillColor: popPalletColor({
        enableWhite: true,
        enableBlack: true,
        enableGrayColors: true,
        enableMainColor: true,
        enableAnalogousColors: true,
        enableComplementColor: true,
        enableTransp: true,
      })
    })
  }
}

function keyTyped() {
  if (key === 's') saveCanvas(TITLE + "_" + SEED, "png") // "png" or "jpg"
  if (key === 'g') saveGif(TITLE + "_" + SEED, 4 * 1 / getTargetFrameRate())
}