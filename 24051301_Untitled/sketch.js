function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("Untitled", false)

  // ここにdrawブロックから参照されるグローバル定数を定義する
  numLoop = 1000

  parameter_1 = []
  for (let i = 0; i < numLoop; i++) {
    parameter_1[i] = {
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
      pixelSize: random(1 / 2, 1),
      strokeColor: popPalletColor({
        enableWhite: dice(2),
        enableBlack: dice(2),
        enableGrayColors: dice(2),
        enableMainColor: dice(2),
        enableAnalogousColors: dice(2),
        enableComplementColor: dice(2),
        enableTransp: dice(2),
      }),
      fillColor: popPalletColor({
        enableWhite: dice(2),
        enableBlack: dice(2),
        enableGrayColors: dice(2),
        enableMainColor: dice(2),
        enableAnalogousColors: dice(2),
        enableComplementColor: dice(2),
        enableTransp: dice(2),
      }),
      isVerticalStripeEnabled: dice(2),
      isHorizontalStripeEnabled: dice(2),
      isSlashEnabled: dice(4),
      isBackSlashEnabled: dice(4),
    }
  }

  {
    parameter_2 = []
    for (let i = 0; i < numLoop; i++) {
      parameter_2[i] = {
        rotate: random(360),
        x: random(),
        y: random(),
        digit: random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
        scale: random(10, 50),
        strokeColor: popPalletColor({
          enableWhite: dice(2),
          enableBlack: dice(2),
          enableGrayColors: dice(2),
          enableMainColor: dice(2),
          enableAnalogousColors: dice(2),
          enableComplementColor: dice(2),
          enableTransp: dice(2),
        }),
        fillColor: popPalletColor({
          enableWhite: dice(2),
          enableBlack: dice(2),
          enableGrayColors: dice(2),
          enableMainColor: dice(2),
          enableAnalogousColors: dice(2),
          enableComplementColor: dice(2),
          enableTransp: dice(2),
        }),
      }
    }
  }

  // {
  //   parameter_3 = []
  //   for (let i = 0; i < numLoop; i++) {
  //     parameter_3[i] = {
  //       rotate: random(360),
  //       x: random(),
  //       y: random(),
  //       fontSize: 40,
  //       words_idx: round(10000 * random()) % WORDS.length,
  //       strokeColor: popPalletColor({
  //         enableWhite: true,
  //         enableBlack: true,
  //         enableGrayColors: false,
  //         enableMainColor: false,
  //         enableAnalogousColors: false,
  //         enableComplementColor: false,
  //         enableTransp: false,
  //       }),
  //       fillColor: popPalletColor({
  //         enableWhite: true,
  //         enableBlack: true,
  //         enableGrayColors: true,
  //         enableMainColor: true,
  //         enableAnalogousColors: true,
  //         enableComplementColor: false,
  //         enableTransp: true,
  //       }),
  //     }
  //   }
  // }

  {
    parameter_4 = {
      bgColor: popPalletColor({
        enableWhite: true,
        enableBlack: true,
        enableGrayColors: true,
        enableMainColor: true,
        enableAnalogousColors: true,
        enableComplementColor: false,
        enableTransp: false,
      }),
      isGradientEnabled: false,
      isConcentrationLineEnabled: false,
      concentrationLineColor: TRANSP
    }
  }

  {
    parameter_5 = {
      fillColor: popPalletColor({
        enableWhite: dice(2),
        enableBlack: dice(2),
        enableGrayColors: dice(2),
        enableMainColor: dice(2),
        enableAnalogousColors: dice(2),
        enableComplementColor: dice(2),
        enableTransp: dice(2),
      }),
      strokeColor: popPalletColor({
        enableWhite: dice(2),
        enableBlack: dice(2),
        enableGrayColors: dice(2),
        enableMainColor: dice(2),
        enableAnalogousColors: dice(2),
        enableComplementColor: dice(2),
        enableTransp: dice(2),
      })
    }
  }

  ar = AR.W16_H9 // chooseRandomAR()
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
      bgColor: parameter_4.bgColor,
      isGradientEnabled: parameter_4.isGradientEnabled,
      isConcentrationLineEnabled: parameter_4.isConcentrationLineEnabled,
      concentrationLineColor: parameter_4.concentrationLineColor
    })

    // 前景
    addForeground()

    // 枠
    addFrame(
      parameter_5.fillColor,
      parameter_5.strokeColor,
      FRAME_WIDTH
    )

    // addSignature("Rayroot", Micro5Regular, BLACK)
    addPaperTexture({
      isDotEnabled: true,
      isFiberEnabled: true,
      isNoiseEnabled: true,
      isFadeEnabled: false,
      isUnevenEnabled: false,
      isFoldLineEnabled: true,
    })
    // fxpreview()
  }

  function addForeground() {
    for (let i = 0; i < numLoop; i++) {
      rotateCallback(parameter_1[i].rotate, () => {
        drawPixelArt({
          bitmap: parameter_1[i].bitmap,
          x: parameter_1[i].x * width,
          y: parameter_1[i].y * height,
          pixelSize: FRAME_WIDTH * parameter_1[i].pixelSize,
          strokeColor: parameter_1[i].strokeColor,
          fillColor: parameter_1[i].fillColor,
          isVerticalStripeEnabled: parameter_1[i].isVerticalStripeEnabled,
          isHorizontalStripeEnabled: parameter_1[i].isHorizontalStripeEnabled,
          isSlashEnabled: parameter_1[i].isSlashEnabled,
          isBackSlashEnabled: parameter_1[i].isBackSlashEnabled,
        })
      })

      rotateCallback(parameter_2[i].rotate, () => {
        draw7SegDisp(
          parameter_2[i].x * width, parameter_2[i].y * height,
          parameter_2[i].digit, parameter_2[i].scale,
          parameter_2[i].strokeColor, parameter_2[i].fillColor
        )
      })

      // if (numLoop * 2 / 3 < i) {
      //   rotateCallback(parameter_3[i].rotate, () => {
      //     strokeWeight(FRAME_WIDTH / 14 * 2)

      //     textFont(Micro5Regular, parameter_3[i].fontSize)
      //     stroke(parameter_3[i].strokeColor)
      //     fill(parameter_3[i].fillColor)
      //     text(
      //       WORDS[parameter_3[i].words_idx],
      //       parameter_3[i].x * width,
      //       parameter_3[i].y * height
      //     )

      //     strokeWeight(FRAME_WIDTH / 14)
      //   })
      // }
    }
  }
}

function keyTyped() {
  if (key === 's') saveCanvas(TITLE + "_" + SEED, "png") // "png" or "jpg"
  if (key === 'g') saveGif(TITLE + "_" + SEED, 4 * 1 / getTargetFrameRate())
}