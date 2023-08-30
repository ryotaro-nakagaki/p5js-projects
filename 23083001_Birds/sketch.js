function preload() { loadFonts() }

function setup() {
  // 作品タイトルを設定
  init("Title", true, ARList.W1_H1)

  // ここにdrawブロックから参照されるグローバル定数を定義する
  randNum = []
  for (let i = 0; i < 10000; i++) {
    randNum.push(random())
  }
  randColor = []
  for (let i = 0; i < 10000; i++) {
    randColor.push(choseRandomColorFromPalette())
  }
  randBitmap = []
  for (let i = 0; i < 10000; i++) {
    randBitmap.push(choseRandomBitmap())
  }
  randBoolean = []
  for (let i = 0; i < 10000; i++) {
    randBoolean.push(dice(8))
  }
}

function windowResized() { draw() }

function draw() {
  createCanvasByAR()
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
      randColor[0], randColor[1], false,
      randNum[0] * width, randNum[1] * height, false
    )
    addForeground()
    addFrame(WHITE, BLACK, FRAME_WIDTH)
    addPaperTexture(true, true, true, true)
    // fxpreview()
  }

  function addForeground() {
    for (let i = 0; i < 100; i++) {
      translateCallback(width * randNum[i], height * randNum[2 * i], () => {
        for (let j = 0; j < 10; j++) {
          stroke(BLACK)
          noiseLine(
            10 * noise(frameCount + 1 * i) + 10 * j,
            10 * noise(frameCount + 2 * i),
            10 * noise(frameCount + 3 * i) + map(randNum[4 * i], 0, 1, -100, 100) + 10 * j,
            10 * noise(frameCount + 4 * i) + map(randNum[5 * i], 0, 1, -100, 100)
          )

          stroke(randColor[2 + i])
          noiseLine(
            10 * noise(frameCount + 1 * i) + 10 * j + 5,
            10 * noise(frameCount + 2 * i),
            10 * noise(frameCount + 3 * i) + map(randNum[4 * i], 0, 1, -100, 100) + 10 * j + 5,
            10 * noise(frameCount + 4 * i) + map(randNum[5 * i], 0, 1, -100, 100)
          )
        }
      })
    }
  }
}

function keyTyped() {
  if (key === 's') saveCanvas(TITLE + "_" + SEED, "png") // "png" or "jpg"
  if (key === 'g') saveGif(TITLE + "_" + SEED, 4 * 1 / getTargetFrameRate())
}