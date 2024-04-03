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
        enableWhite: true,
        enableBlack: true,
        enableGrayColors: true,
        enableMainColor: true,
        enableAnalogousColors: true,
        enableComplementColor: true,
        enableTransp: false,
      }),
      dice(2)
    )

    //前景
    addForeground()

    // 枠
    addFrame(
      popPalletColor({
        enableWhite: true,
        enableBlack: true,
        enableGrayColors: true,
        enableMainColor: true,
        enableAnalogousColors: true,
        enableComplementColor: true,
        enableTransp: false,
      }),
      popPalletColor({
        enableWhite: true,
        enableBlack: true,
        enableGrayColors: true,
        enableMainColor: true,
        enableAnalogousColors: true,
        enableComplementColor: true,
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
    })
    // fxpreview()
  }

  function addForeground() {
    const lineColor = popPalletColor({
      enableWhite: true,
      enableBlack: true,
      enableGrayColors: true,
      enableMainColor: true,
      enableAnalogousColors: true,
      enableComplementColor: true,
      enableTransp: false,
    })

    translateCallback(width / 2, height / 2, () => {
      const numLines = round(random(2, 6))
      for (let theta = -90; theta < 360 - 90; theta += 360 / numLines) {
        point1 = {
          x: width * cos(radians(theta - 360 / (numLines * 4))),
          y: height * sin(radians(theta - 360 / (numLines * 4))),
        }
        point2 = {
          x: width * cos(radians(theta + 360 / (numLines * 4))),
          y: height * sin(radians(theta + 360 / (numLines * 4))),
        }

        noStroke()
        fill(lineColor)
        triangle(0, 0, point1.x, point1.y, point2.x, point2.y)

        stroke(lineColor)
        noiseLine(0, 0, point1.x, point1.y)
        noiseLine(0, 0, point2.x, point2.y)
      }
    })

    drawPixelArt({
      bitmap: chooseRandomBitmap(),
      x: width / 2, y: height / 2,
      pixelSize: 25,
      strokeColor: popPalletColor({
        enableWhite: true,
        enableBlack: true,
        enableGrayColors: true,
        enableMainColor: true,
        enableAnalogousColors: true,
        enableComplementColor: true,
        enableTransp: false,
      }),
      fillColor: popPalletColor({
        enableWhite: true,
        enableBlack: true,
        enableGrayColors: true,
        enableMainColor: true,
        enableAnalogousColors: true,
        enableComplementColor: true,
        enableTransp: false,
      })
    })
  }
}

function keyTyped() {
  if (key === 's') saveCanvas(TITLE + "_" + SEED, "png") // "png" or "jpg"
  if (key === 'g') saveGif(TITLE + "_" + SEED, 4 * 1 / getTargetFrameRate())
}