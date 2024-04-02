function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("DominantColors2", true)

  // ここにdrawブロックから参照されるグローバル定数を定義する
  {
    parameter_1 = []
    numPixelArt = 100
    for (let i = 0; i < numPixelArt; i++) {
      parameter_1[i] = {
        rotate: random(0),
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
          enableBlack: true,
          enableGrayColors: false,
          enableMainColor: true,
          enableAnalogousColors: false,
          enableComplementColor: true,
          enableTransp: true,
        }),
        isSlashEnabled: dice(0),
        isBackSlashEnabled: dice(0),
      }
    }
  }

  {
    parameter_2 = []
    num7segDisp = 100
    for (let k = 0; k < num7segDisp; k++) {
      parameter_2[k] = {
        rotate: random(0),
        x: random(),
        y: random(),
        digit: random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
        scale: random(20, 150),
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
          enableBlack: true,
          enableGrayColors: false,
          enableMainColor: true,
          enableAnalogousColors: false,
          enableComplementColor: true,
          enableTransp: true,
        }),
      }
    }
  }

  ar = AR.W1_H1 // chooseRandomAR()
}

function windowResized() { draw() }

function draw() {
  createCanvasByAR(ar)
  // createCanvas(1080 / 4, 1080 / 4)

  FRAME_WIDTH = min(width, height) / 20

  {
    strokeCap(SQUARE) // ROUND, SQUARE, PROJECT
    strokeJoin(BEVEL) // MITER, BEVEL, ROUND
    strokeWeight(FRAME_WIDTH / 10)
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
    addFrame(WHITE, BLACK, FRAME_WIDTH)

    // addSignature("Rayroot", coveredByYourGrace, BLACK)
    addPaperTexture({
      isDotEnabled: false,
      isFiberEnabled: true,
      isNoiseEnabled: true,
      isFadeEnabled: true,
      isUnevenEnabled: true,
    })
    // fxpreview()
  }

  function addForeground() {
    {
      for (let i = 0; i < numPixelArt; i++) {
        rotateCallback(parameter_1[i].rotate, () => {
          drawPixelArt(
            parameter_1[i].bitmap,
            parameter_1[i].x * width,
            parameter_1[i].y * height,
            FRAME_WIDTH / parameter_1[i].pixelSize,
            parameter_1[i].strokeColor, parameter_1[i].fillColor,
            parameter_1[i].isSlashEnabled, parameter_1[i].isBackSlashEnabled
          )
        })
        rotateCallback(parameter_2[i].rotate, () => {
          draw7SegDisp(
            parameter_2[i].x * width, parameter_2[i].y * height,
            parameter_2[i].digit, parameter_2[i].scale,
            parameter_2[i].strokeColor, parameter_2[i].fillColor
          )
        })
      }
    }
  }
}

function keyTyped() {
  if (key === 's') saveCanvas(TITLE + "_" + SEED, "png") // "png" or "jpg"
  if (key === 'g') saveGif(TITLE + "_" + SEED, 4 * 1 / getTargetFrameRate())
}