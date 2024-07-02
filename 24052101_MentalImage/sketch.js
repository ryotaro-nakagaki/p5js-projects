function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("MentalImage", false)

  // ここにdrawブロックから参照されるグローバル定数を定義する
  numLoop = 500

  pixelArtParams = []
  for (let i = 0; i < numLoop; i++) {
    pixelArtParams[i] = {
      rotate: random(360),
      bitmap: random([
        BITMAP.SMILE, BITMAP.VIDEO2, BITMAP.ERROR,
        BITMAP.CURSOR_NORMAL_SELECT, BITMAP.CURSOR_LINK_SELECT,
        BITMAP.CURSOR_BUSY,
        BITMAP.INVADER_SQUID, BITMAP.INVADER_CRAB,
        BITMAP.INVADER_OCTOPUS,
        BITMAP.GLIDER, BITMAP.LIGHTWEIGHT_SPACESHIP,
        BITMAP.MIDDLEWEIGHT_SPACESHIP, BITMAP.HEAVYWEIGHT_SPACESHIP,
        // BITMAP.SMILY_FACE, BITMAP.TEZOS, BITMAP.OMOCHISKY_LOGO
      ]),
      x: random(),
      y: random(),
      pixelSize: random(),
      strokeColor: popPalletColor({
        enableWhite: true,
        enableBlack: true,
        enableGrayColors: true,
        enableMainColor: true,
        enableAnalogousColors: true,
        enableComplementColor: false,
        enableTransp: true,
      }),
      fillColor: popPalletColor({
        enableWhite: true,
        enableBlack: true,
        enableGrayColors: true,
        enableMainColor: true,
        enableAnalogousColors: true,
        enableComplementColor: false,
        enableTransp: true,
      }),
      isVerticalStripeEnabled: dice(8),
      isHorizontalStripeEnabled: dice(8),
      isSlashEnabled: dice(8),
      isBackSlashEnabled: dice(8),
    }
  }

  // {
  //   SSDParams = []
  //   for (let i = 0; i < numLoop; i++) {
  //     SSDParams[i] = {
  //       rotate: random(0),
  //       x: random(),
  //       y: random(),
  //       digit: random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
  //       scale: random(10, 50),
  //       strokeColor: popPalletColor({
  //         enableWhite: dice(2),
  //         enableBlack: dice(2),
  //         enableGrayColors: dice(2),
  //         enableMainColor: dice(2),
  //         enableAnalogousColors: dice(0),
  //         enableComplementColor: dice(0),
  //         enableTransp: dice(2),
  //       }),
  //       fillColor: popPalletColor({
  //         enableWhite: dice(2),
  //         enableBlack: dice(2),
  //         enableGrayColors: dice(2),
  //         enableMainColor: dice(2),
  //         enableAnalogousColors: dice(0),
  //         enableComplementColor: dice(0),
  //         enableTransp: dice(2),
  //       }),
  //     }
  //   }
  // }

  {
    backgroundParams = {
      bgColor: popPalletColor({
        enableWhite: dice(2),
        enableBlack: dice(2),
        enableGrayColors: dice(2),
        enableMainColor: dice(2),
        enableAnalogousColors: dice(0),
        enableComplementColor: dice(0),
        enableTransp: dice(0),
      }),
      isGradientEnabled: dice(0),
      isConcentrationLineEnabled: dice(0),
      concentrationLineColor: TRANSP
    }
  }

  {
    frameParams = {
      fillColor: popPalletColor({
        enableWhite: dice(0),
        enableBlack: dice(1),
        enableGrayColors: dice(0),
        enableMainColor: dice(0),
        enableAnalogousColors: dice(0),
        enableComplementColor: dice(0),
        enableTransp: dice(0),
      }),
      strokeColor: popPalletColor({
        enableWhite: dice(1),
        enableBlack: dice(0),
        enableGrayColors: dice(0),
        enableMainColor: dice(0),
        enableAnalogousColors: dice(0),
        enableComplementColor: dice(0),
        enableTransp: dice(0),
      })
    }
  }

  ar = AR.W1_H1 // chooseRandomAR()
}

function windowResized() { draw() }

function draw() {
  createCanvasByAR(ar)
  // createCanvasByResolution(RESOLUTION.TWITTER_PROFILE)

  FRAME_WIDTH = min(width, height) / 24

  {
    strokeCap(SQUARE) // ROUND, SQUARE, PROJECT
    strokeJoin(BEVEL) // MITER, BEVEL, ROUND
    strokeWeight(FRAME_WIDTH / 14)
    rectMode(CENTER) // CENTER, CORNERS
    textAlign(CENTER, CENTER)
  }

  {
    // 背景
    addBackground({
      bgColor: backgroundParams.bgColor,
      isGradientEnabled: backgroundParams.isGradientEnabled,
      isConcentrationLineEnabled: backgroundParams.isConcentrationLineEnabled,
      concentrationLineColor: backgroundParams.concentrationLineColor
    })

    // 前景
    addForeground()

    // 枠
    addFrame(
      frameParams.fillColor,
      frameParams.strokeColor,
      FRAME_WIDTH
    )

    // addSignature("// Rayroot", Micro5Regular, WHITE)
    addPaperTexture({
      isDotEnabled: true,
      isFiberEnabled: true,
      isNoiseEnabled: true,
      isFadeEnabled: false,
      isUnevenEnabled: false,
      isFoldLineEnabled: true,
    })
  }

  function addForeground() {
    for (let i = 0; i < numLoop; i++) {
      rotateCallback(pixelArtParams[i].rotate, () => {
        drawPixelArt({
          bitmap: pixelArtParams[i].bitmap,
          x: pixelArtParams[i].x * width,
          y: pixelArtParams[i].y * height,
          pixelSize: FRAME_WIDTH * pixelArtParams[i].pixelSize,
          strokeColor: pixelArtParams[i].strokeColor,
          fillColor: pixelArtParams[i].fillColor,
          isVerticalStripeEnabled: pixelArtParams[i].isVerticalStripeEnabled,
          isHorizontalStripeEnabled: pixelArtParams[i].isHorizontalStripeEnabled,
          isSlashEnabled: pixelArtParams[i].isSlashEnabled,
          isBackSlashEnabled: pixelArtParams[i].isBackSlashEnabled,
        })
      })

      // rotateCallback(SSDParams[i].rotate, () => {
      //   draw7SegDisp(
      //     SSDParams[i].x * width, SSDParams[i].y * height,
      //     SSDParams[i].digit, SSDParams[i].scale,
      //     SSDParams[i].strokeColor, SSDParams[i].fillColor
      //   )
      // })
    }
  }
}

function keyTyped() {
  if (key === 's') saveCanvas(TITLE + "_" + SEED, "png") // "png" or "jpg"
  if (key === 'g') saveGif(TITLE + "_" + SEED, 4 * 1 / getTargetFrameRate())
}