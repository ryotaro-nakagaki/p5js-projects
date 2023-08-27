function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("FluidBlocks", true)

  // ここにdrawブロックから参照されるグローバル定数を定義する
  paramsNum = []
  for (let i = 0; i < 10000; i++) {
    paramsNum.push(random())
  }
  paramsColor = []
  for (let i = 0; i < 10000; i++) {
    paramsColor.push(choseRandomColorFromPalette())
  }
  paramsBitmap = []
  for (let i = 0; i < 10000; i++) {
    paramsBitmap.push(choseRandomBitmap())
  }
  paramsDice = []
  for (let i = 0; i < 10000; i++) {
    paramsDice.push(dice(8))
  }
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
    addBackground(
      paramsColor[0], paramsColor[1], true,
      paramsNum[0] * width, paramsNum[1] * height, true
    )
    addForeground()
    addFrame(WHITE, BLACK, FRAME_WIDTH)
    addPaperTexture(true, true, true, false)
    // fxpreview()
  }

  function addForeground() {
    translateCallback(0, 0, () => {
      for (let i = 0; i < 500; i++) {
        drawPixelArt(
          paramsBitmap[i],
          paramsNum[2 + i] * width,// + randomGaussian(0, 1),
          paramsNum[3 + i] * height,// + randomGaussian(0, 1),
          FRAME_WIDTH / 1.5,
          BLACK, choseRandomColorFromPalette(),
          paramsDice[i], paramsDice[1 + i], paramsDice[2 + i], paramsDice[3 + i]
        )
      }
    })
  }
}

function keyTyped() {
  if (key === 's') saveCanvas(TITLE + "_" + SEED, "png") // "png" or "jpg"
  if (key === 'g') saveGif(TITLE + "_" + SEED, 5 * 1 / getTargetFrameRate())
}