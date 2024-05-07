// global変数を宣言
const RESOLUTION_X = 6 * 64 * (1 / 4)
const RESOLUTION_Y = 6 * 64 * (1 / 4)
const PIXEL_SIZE = 16
const LETTER_WIDTH = 5
const LETTER_HEIGHT = 5
const LIGHT_ON = 1
const LIGHT_OFF = 0

const screen = []
for (let y = 0; y < RESOLUTION_Y; y++) {
  screen.push([])
  for (let x = 0; x < RESOLUTION_X; x++) {
    screen[y].push(0)
  }
}

function setup() {
  createCanvas(
    RESOLUTION_X * PIXEL_SIZE,
    RESOLUTION_Y * PIXEL_SIZE
  )
  background(BLACK)
  noLoop()

  colorMode(HSB, 100)
  MAIN_COLOR = WINDOWS_95_LOGO_GREEN // color(HUE, SAT, BRI)
}

function draw() {
  fill(MAIN_COLOR)

  noStroke()
  // stroke(BLACK)
  // strokeWeight(1)
  // strokeCap(SQUARE) // ROUND, SQUARE, PROJECT
  // strokeJoin(BEVEL) // MITER, BEVEL, ROUND

  rectMode(CORNERS) // CENTER, CORNERS

  textAlign(CENTER, CENTER)


  drawingContext.shadowBlur = PIXEL_SIZE * 4
  drawingContext.shadowColor = MAIN_COLOR

  {
    // 背景
    addBackground()

    // 前景
    addForeground()
  }

  function addBackground() {

  }

  function addForeground() {
    for (let y = 0; y < RESOLUTION_Y; y++) {
      for (let x = 0; x < RESOLUTION_X; x++) {
        const bitmap = chooseRandomBitmap()
        updateScreen((LETTER_WIDTH + 1) * x, (LETTER_HEIGHT + 1) * y, bitmap)
      }
    }

    function chooseRandomBitmap() {
      return random(Object.values(BITMAP))
    }

    function updateScreen(originX, originY, bitmap) {
      for (let y = 0; y < LETTER_HEIGHT; y++) {
        for (let x = 0; x < LETTER_WIDTH; x++) {
          if (y + originY < RESOLUTION_Y && x + originX < RESOLUTION_X) {
            screen[y + originY][x + originX] = bitmap[y][x]
          }
        }
      }
    }

    printChar()

    function printChar() {
      for (let y = 0; y < RESOLUTION_Y; y++) {
        for (let x = 0; x < RESOLUTION_X; x++) {
          if (screen[y][x] === LIGHT_ON) {
            rect(
              x * width / RESOLUTION_X, y * height / RESOLUTION_Y,
              (x + 1) * width / RESOLUTION_X, (y + 1) * height / RESOLUTION_Y
            )
          }
        }
      }
    }
  }
}

function keyTyped() {
  if (key === 's') saveCanvas() // "png" or "jpg"
  if (key === 'g') saveGif(TITLE + "_" + SEED, 4 * 1 / getTargetFrameRate())
}