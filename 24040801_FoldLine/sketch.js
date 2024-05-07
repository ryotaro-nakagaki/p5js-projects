function setup() {
  // 作品タイトルを設定
  init("Untitled", false)

  // ここにdrawブロックから参照されるグローバル定数を定義する

  ar = AR.W1_H1 // chooseRandomAR()
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
      popPalletColor({
        enableWhite: false,
        enableBlack: false,
        enableGrayColors: false,
        enableMainColor: true,
        enableAnalogousColors: false,
        enableComplementColor: false,
        enableTransp: false,
      }),
      true
    )

    //前景
    addForeground()

    // 枠
    addFrame(
      popPalletColor({
        enableWhite: true,
        enableBlack: false,
        enableGrayColors: false,
        enableMainColor: false,
        enableAnalogousColors: false,
        enableComplementColor: false,
        enableTransp: false,
      }),
      popPalletColor({
        enableWhite: true,
        enableBlack: false,
        enableGrayColors: false,
        enableMainColor: false,
        enableAnalogousColors: false,
        enableComplementColor: false,
        enableTransp: false,
      }),
      FRAME_WIDTH
    )

    // addSignature("Rayroot", coveredByYourGrace, BLACK)
    addPaperTexture({
      isDotEnabled: true,
      isFiberEnabled: true,
      isNoiseEnabled: true,
      isFadeEnabled: true,
      isUnevenEnabled: true,
      isFoldLineEnabled: true,
    })
    // fxpreview()
  }

  function addForeground() { }
}

function keyTyped() {
  if (key === 's') saveCanvas(TITLE + "_" + SEED, "png") // "png" or "jpg"
  if (key === 'g') saveGif(TITLE + "_" + SEED, 4 * 1 / getTargetFrameRate())
}