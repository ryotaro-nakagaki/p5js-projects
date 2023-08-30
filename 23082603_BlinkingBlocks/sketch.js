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

  ar = chooseRandomAR()
}

function windowResized() { draw() }

function draw() {
  createCanvasByAR(ar)
  FRAME_WIDTH = min(width, height) / 25

  {
    strokeCap(SQUARE) // ROUND, SQUARE, PROJECT
    strokeJoin(BEVEL) // MITER, BEVEL, ROUND
    strokeWeight(FRAME_WIDTH / 8)
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
      for (let i = 0; i < 10000; i++) {
        rotateCallback(paramsNum[i] * 360, () => {
          drawPixelArt(
            paramsBitmap[i],
            paramsNum[2 + i] * width,
            paramsNum[3 + i] * height,
            FRAME_WIDTH * map(paramsNum[4 + i], 0, 1, 1 / 32, 1),
            BLACK,
            choseRandomColorFromPalette(),
            false, // paramsDice[i],
            false, // paramsDice[1 + i],
            false, // paramsDice[2 + i],
            false, // paramsDice[3 + i]
          )
        })
      }
    })
  }
}

function keyTyped() {
  if (key === 's') saveCanvas(TITLE + "_" + SEED, "png") // "png" or "jpg"
  if (key === 'g') saveGif(TITLE + "_" + SEED, 4 * 1 / getTargetFrameRate())
}