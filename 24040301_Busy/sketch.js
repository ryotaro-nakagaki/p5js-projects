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
      dice(0)
    )

    //前景
    addForeground()

    // 枠
    addFrame(
      popPalletColor({
        enableWhite: true,
        enableBlack: true,
        enableGrayColors: false,
        enableMainColor: false,
        enableAnalogousColors: false,
        enableComplementColor: false,
        enableTransp: false,
      }),
      popPalletColor({
        enableWhite: false,
        enableBlack: false,
        enableGrayColors: false,
        enableMainColor: true,
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

  function addForeground() {
    let point = { x: random(width), y: random(height) }
    let offset = { x: random(), y: random() }

    for (let i = 0; i < 25; i++) {
      drawPixelArt({
        bitmap: BITMAP.CURSOR_BUSY,
        x: point.x, y: point.y,
        pixelSize: 10,
        strokeColor: popPalletColor({
          enableWhite: false,
          enableBlack: true,
          enableGrayColors: false,
          enableMainColor: false,
          enableAnalogousColors: false,
          enableComplementColor: false,
          enableTransp: false,
        }),
        fillColor: popPalletColor({
          enableWhite: true,
          enableBlack: false,
          enableGrayColors: false,
          enableMainColor: false,
          enableAnalogousColors: false,
          enableComplementColor: false,
          enableTransp: false,
        })
      })

      point.x += 30 * map(noise(offset.x + i / 100), 0, 1, -1, 1)
      point.y += 30 * map(noise(offset.y + i / 100), 0, 1, -1, 1)
    }
  }
}

function keyTyped() {
  if (key === 's') saveCanvas(TITLE + "_" + SEED, "png") // "png" or "jpg"
  if (key === 'g') saveGif(TITLE + "_" + SEED, 4 * 1 / getTargetFrameRate())
}