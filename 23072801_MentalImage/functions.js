function init(title) {
  // シード値の初期化
  SEED = floor(fxrand() * (10 ** 16))
  randomSeed(SEED)
  noiseSeed(SEED)

  // 作品タイトルの初期化
  TITLE = title
  document.title = TITLE

  // 色関係の初期化
  colorMode(HSB, 100)
  HUE = random(100), SAT = 100, BRI = 100

  // 基準色
  mainColor = color(HUE, SAT, BRI)

  // 類似色
  analogousColors = [
    color((HUE + 100 / 24) % 100, SAT, BRI),
    color((HUE - 100 / 24) % 100, SAT, BRI)
  ]

  // 補色
  complementColor = color((HUE + 50) % 100, SAT, BRI)

  // グレースケール
  BLACK = "#000", WHITE = "#FFF"
  LIGHT_GRAY = "#BBB", GRAY = "#777", DARK_GRAY = "#333"
  TRANSP = "#0000"

  smooth()
  noLoop()
}

function choseRandomColorFromPalette() {
  return random([
    WHITE, LIGHT_GRAY, GRAY, DARK_GRAY,
    mainColor, analogousColors[0], analogousColors[1]
  ])
}

function dice(numSurface) {
  return floor(random(10000)) % numSurface === 0
}

const AR = Object.freeze({
  W1_H1: 1 / 1,
  W4_H3: 3 / 4,
  W3_H4: 4 / 3,
  W16_H9: 9 / 16,
  W9_H16: 16 / 9
})

function createCanvasByAR(AR) {
  AR < windowHeight / windowWidth ?
    createCanvas(windowWidth, windowWidth * AR) :
    createCanvas(windowHeight / AR, windowHeight)
}

function translateCallback(transX, transY, CallbackFuncion) {
  translate(transX, transY)
  CallbackFuncion()
  translate(-transX, -transY)
}

/**
 * 背景を追加する関数
 *
 * @param {Object} fillColor 塗りの色
 * @param {Boolean} isGradientEnabled グラデーションさせるか
 */
function addBackground(fillColor, isGradientEnabled) {
  // 背景を単色で塗る
  background(fillColor)

  // グラデーションを追加する
  if (isGradientEnabled) {
    colorMode(HSB, 100)
    const img = createImage(width, height)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const c = color(
          hue(fillColor),
          100 * y / height,
          brightness(fillColor),
          50
        )
        img.set(x, y, c)
      }
    }
    img.updatePixels(), image(img, 0, 0)
  }
}

function addFrame(fillColor, strokeColor, frameWidth) {
  translateCallback(width / 2, height / 2, () => {
    // 枠
    noStroke(), fill(fillColor)

    const centerX = width / 2 - frameWidth / 2
    const centerY = height / 2 - frameWidth / 2

    rect(-centerX, 0, frameWidth, height)
    rect(centerX, 0, frameWidth, height)
    rect(0, -centerY, width, frameWidth)
    rect(0, centerY, width, frameWidth)

    // 枠線
    stroke(strokeColor), noFill()

    const vertexX = width / 2 - frameWidth
    const vertexY = height / 2 - frameWidth

    noiseLine(-vertexX, -vertexY, vertexX, -vertexY)
    noiseLine(-vertexX, vertexY, vertexX, vertexY)
    noiseLine(-vertexX, -vertexY, -vertexX, vertexY)
    noiseLine(vertexX, -vertexY, vertexX, vertexY)
  })
}

function noiseLine(x1, y1, x2, y2) {
  const v1 = createVector(x1, y1)
  const v2 = createVector(x2, y2)
  const dv = v2.sub(v1)
  const dl = dv.mag()

  beginShape()
  for (let i = 0; i <= dl; i += 1) {
    vertex(
      v1.x + dv.x * i / dl + random(FRAME_WIDTH / 32),
      v1.y + dv.y * i / dl + random(FRAME_WIDTH / 32)
    )
  }
  endShape()
}

function addSignature(string, font, color) {
  noStroke(), fill(color)
  textFont(font), textSize(FRAME_WIDTH * 0.75), textAlign(RIGHT, BOTTOM)
  text(string, width - FRAME_WIDTH * 1.5, height - FRAME_WIDTH * 1.5)
}

function drawShape(strokeColor, fillColor, func) {
  stroke(strokeColor)
  fill(fillColor)
  beginShape()
  func()
  endShape(CLOSE)
}

function drawRegularPolygon(centerX, centerY, r, offsetTheta, numVertex) {
  translateCallback(centerX, centerY, () => {
    beginShape()
    for (let theta = offsetTheta; theta < 360 + offsetTheta; theta += 360 / numVertex) {
      vertex(r * cos(radians(theta)), r * sin(radians(theta)))
    }
    endShape(CLOSE)
  })
}

function verticalLineTriangle(x1, y1, x2, y2, x3, y3, lineDash1, lineDash2) {
  let tmp
  if (x2 < x1) { tmp = x1, x1 = x2, x2 = tmp }
  if (x3 < x1) { tmp = x1, x1 = x3, x3 = tmp }
  if (x3 < x2) { tmp = x2, x2 = x3, x3 = tmp }

  triangle(x1, y1, x2, y2, x3, y3)

  drawingContext.setLineDash([lineDash1, lineDash2])
  for (let x = -width / 2; x < width / 2; x += FRAME_WIDTH / 10) {
    if (x1 < x && x <= x2) {
      line(x, h(x), x, f(x))
    }
    if (x2 < x && x < x3) {
      line(x, h(x), x, g(x))
    }
  }
  drawingContext.setLineDash([])

  function f(x) {
    const a = (y1 - y2) / (x1 - x2)
    return a * x + y1 - a * x1
  }
  function g(x) {
    const a = (y2 - y3) / (x2 - x3)
    return a * x + y2 - a * x2
  }
  function h(x) {
    const a = (y3 - y1) / (x3 - x1)
    return a * x + y3 - a * x3
  }
}

function drawPixelArt(bitmap, x, y, pixelSize, strokeColor, fillColor, isSlashEnabled, isBackSlashEnabled) {
  const lengthX = bitmap[0].length
  const lengthY = bitmap.length
  const transX = x - pixelSize * (lengthX - 1) / 2
  const transY = y - pixelSize * (lengthY - 1) / 2

  translateCallback(transX, transY, () => {

    // 塗り
    fill(fillColor), noStroke()
    for (let y = 0; y < lengthY; y++) {
      for (let x = 0; x < lengthX; x++) {
        if (bitmap[y][x] === 1) {
          for (let i = 0; i < 3; i++) {
            rect(pixelSize * x, pixelSize * y, pixelSize)
          }
        }
      }
    }

    // 斜線
    stroke(strokeColor)
    for (let y = 0; y < lengthY; y++) {
      for (let x = 0; x < lengthX; x++) {
        if (bitmap[y][x] === 1) {
          const x0 = pixelSize * x
          const y0 = pixelSize * y

          translateCallback(x0, y0, () => {
            // スラッシュ（/）方向
            if (isSlashEnabled) {
              noiseLine(
                -pixelSize * 1 / 6, -pixelSize * 1 / 2,
                -pixelSize * 1 / 2, -pixelSize * 1 / 6
              )
              noiseLine(
                +pixelSize * 1 / 6, -pixelSize * 1 / 2,
                -pixelSize * 1 / 2, +pixelSize * 1 / 6
              )
              noiseLine(
                +pixelSize * 1 / 2, -pixelSize * 1 / 2,
                -pixelSize * 1 / 2, +pixelSize * 1 / 2
              )
              noiseLine(
                +pixelSize * 1 / 2, -pixelSize * 1 / 6,
                -pixelSize * 1 / 6, +pixelSize * 1 / 2
              )
              noiseLine(
                +pixelSize * 1 / 2, +pixelSize * 1 / 6,
                +pixelSize * 1 / 6, +pixelSize * 1 / 2
              )
            }

            // バックスラッシュ（\）方向
            if (isBackSlashEnabled) {
              noiseLine(
                +pixelSize * 1 / 6, -pixelSize * 1 / 2,
                +pixelSize * 1 / 2, -pixelSize * 1 / 6
              )
              noiseLine(
                -pixelSize * 1 / 6, -pixelSize * 1 / 2,
                +pixelSize * 1 / 2, +pixelSize * 1 / 6
              )
              noiseLine(
                -pixelSize * 1 / 2, -pixelSize * 1 / 2,
                +pixelSize * 1 / 2, +pixelSize * 1 / 2
              )
              noiseLine(
                -pixelSize * 1 / 2, -pixelSize * 1 / 6,
                +pixelSize * 1 / 6, +pixelSize * 1 / 2
              )
              noiseLine(
                -pixelSize * 1 / 2, +pixelSize * 1 / 6,
                -pixelSize * 1 / 6, +pixelSize * 1 / 2
              )
            }
          })
        }
      }
    }

    // 輪郭線
    stroke(strokeColor), strokeCap(ROUND)
    for (let y = 0; y < lengthY; y++) {
      for (let x = 0; x < lengthX; x++) {
        if (bitmap[y][x] === 1) {
          // 左
          if (x === 0 || bitmap[y][x - 1] === 0) {
            noiseLine(
              pixelSize * (x - 1 / 2), pixelSize * (y - 1 / 2),
              pixelSize * (x - 1 / 2), pixelSize * (y + 1 / 2)
            )
          }
          // 上
          if (y === 0 || bitmap[y - 1][x] === 0) {
            noiseLine(
              pixelSize * (x - 1 / 2), pixelSize * (y - 1 / 2),
              pixelSize * (x + 1 / 2), pixelSize * (y - 1 / 2)
            )
          }
          // 右
          if (x === lengthX - 1 || bitmap[y][x + 1] === 0) {
            noiseLine(
              pixelSize * (x + 1 / 2), pixelSize * (y - 1 / 2),
              pixelSize * (x + 1 / 2), pixelSize * (y + 1 / 2)
            )
          }
          // 下
          if (y === lengthY - 1 || bitmap[y + 1][x] === 0) {
            noiseLine(
              pixelSize * (x - 1 / 2), pixelSize * (y + 1 / 2),
              pixelSize * (x + 1 / 2), pixelSize * (y + 1 / 2)
            )
          }
        }
      }
    }
  })
}

const BITMAP = Object.freeze({
  SMILE: [
    [0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 0]
  ],
  CURSOR_NORMAL_SELECT: [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
    [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0]
  ],
  CURSOR_LINK_SELECT: [
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  ],
  CURSOR_BUSY: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  TEZOS: [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 1, 1, 0, 0]
  ],
  INVADER_SQUID: [
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 1, 1, 0, 1, 0],
    [1, 0, 1, 0, 0, 1, 0, 1]
  ],
  INVADER_CRAB: [
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0]
  ],
  INVADER_OCTOPUS: [
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
  ],
  GLIDER: [
    [1, 1, 1],
    [1, 0, 0],
    [0, 1, 0]
  ],
  SPACESHIP: [
    [0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0]
  ],
  VIDEO2: [
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
  ],
  ERROR: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  SMILY_FACE: [
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
  ]
})

function addPaperTexture() {
  // ピクセルごとにノイズを乗せる
  rectMode(CORNER)
  colorMode(RGB, 100)

  const img = createImage(width, height)
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      img.set(x, y, color(100 * random(), 100 * random(), 100 * random(), 20))
    }
  }
  img.updatePixels(), image(img, 0, 0)

  // 繊維の描画
  stroke(color(255, 35)), strokeWeight(FRAME_WIDTH / 300), noFill()
  for (let y = 0; y <= height; y += height / 200) {
    for (let x = 0; x <= width; x += width / 200) {
      beginShape()
      for (let i = 0; i < 4; i++) {
        curveVertex(x + random(FRAME_WIDTH), y + random(FRAME_WIDTH))
      }
      endShape()
    }
  }

  // 紙の色褪せの描画
  noStroke(), fill(color(100, 100, 0, 10))
  rect(0, 0, width, height)

  // インクのむら
  {
    colorMode(RGB, 100)
    const offset = { x: randomGaussian(), y: randomGaussian() }
    const img = createImage(width, height)
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        img.set(x, y, color(100 * noise(offset.x + x / 500, offset.y + y / 500), 15))
      }
    }
    img.updatePixels()
    image(img, 0, 0)
  }
}

function draw7SegDisp(x, y, digit, scale, strokeColor, fillColor) {
  const l = scale * 1.0 // 各セグメントの長さ
  const m = scale * 0.4 // 各セグメントの太さ
  const n = scale * 1.6 // 各セグメント間の距離
  const p = scale * 0.2 // 各セグメント間の角

  translateCallback(x, y, () => {
    // 左上
    drawSegment([0, 4, 5, 6, 8, 9], [
      { x: -m - n, y: -l - n - 2 * p },
      { x: - n - p, y: -l - m - n - p },
      { x: m - n, y: -l - n },
      { x: m - n, y: l - n },
      { x: - n, y: l + m - n },
      { x: -m - n, y: l - n }
    ])

    // 右上
    drawSegment([0, 1, 2, 3, 4, 7, 8, 9], [
      { x: -m + n, y: -l - n },
      { x: n + p, y: -l - m - n - p },
      { x: m + n, y: -l - n - 2 * p },
      { x: m + n, y: l - n },
      { x: n, y: l + m - n },
      { x: -m + n, y: l - n },
    ])

    // 左下
    drawSegment([0, 2, 6, 8], [
      { x: -m - n, y: -l + n },
      { x: - n, y: -l - m + n },
      { x: m - n, y: -l + n },
      { x: m - n, y: l + n },
      { x: - n - p, y: l + m + n + p },
      { x: -m - n, y: l + n + 2 * p },
    ])

    // 右下   
    drawSegment([0, 1, 3, 4, 5, 6, 7, 8, 9], [
      { x: -m + n, y: -l + n },
      { x: n, y: -l - m + n },
      { x: m + n, y: -l + n },
      { x: m + n, y: l + n + 2 * p },
      { x: n + p, y: l + m + n + p },
      { x: -m + n, y: l + n },
    ])

    // 上
    drawSegment([0, 2, 3, 5, 6, 7, 8, 9], [
      { x: -l - 2 * p, y: -m - 2 * n },
      { x: l + 2 * p, y: -m - 2 * n },
      { x: l + m + p, y: -2 * n - p },
      { x: l, y: m - 2 * n },
      { x: -l, y: m - 2 * n },
      { x: -l - m - p, y: -2 * n - p },
    ])

    // 中央
    drawSegment([2, 3, 4, 5, 6, 8, 9], [
      { x: -l, y: -m },
      { x: l, y: -m },
      { x: l + m, y: 0 },
      { x: l, y: m },
      { x: -l, y: m },
      { x: -l - m, y: 0 },
    ])

    // 下
    drawSegment([0, 2, 3, 5, 6, 8, 9], [
      { x: -l, y: -m + 2 * n },
      { x: l, y: -m + 2 * n },
      { x: l + m + p, y: 2 * n + p },
      { x: l + 2 * p, y: m + 2 * n },
      { x: -l - 2 * p, y: m + 2 * n },
      { x: -l - m - p, y: 2 * n + p },
    ])

    function drawSegment(numberList, points) {
      for (let i = 0; i < numberList.length; i++) {
        if (digit === numberList[i]) {
          // 塗り
          noStroke(), fill(fillColor)
          beginShape()
          for (let i = 0; i < points.length; i++) {
            vertex(points[i].x, points[i].y)
          }
          endShape(CLOSE)

          // 枠線
          stroke(strokeColor)
          for (let i = 0; i < points.length; i++) {
            i !== points.length - 1 ?
              noiseLine(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y) :
              noiseLine(points[i].x, points[i].y, points[0].x, points[0].y)
          }
          break
        }
      }
    }
  })
}

function loadFonts() {
  // 等幅
  shareTechMono = loadFont("fonts/ShareTechMono-Regular.ttf")
  specialElite = loadFont("fonts/SpecialElite-Regular.ttf")

  // 手書き
  coveredByYourGrace = loadFont("fonts/CoveredByYourGrace-Regular.ttf")
  sedgwickAve = loadFont("fonts/SedgwickAve-Regular.ttf")
  rangaRegular = loadFont("fonts/Ranga-Regular.ttf")
  rangaBold = loadFont("fonts/Ranga-Bold.ttf")

  // 筆記体
  seaweedScript = loadFont("fonts/SeaweedScript-Regular.ttf")

  // ビットマップ
  silkscreenRegular = loadFont("fonts/Silkscreen-Regular.ttf")
  silkscreenBold = loadFont("fonts/Silkscreen-Bold.ttf")
  vt323 = loadFont("fonts/VT323-Regular.ttf")

  // バーコード
  libreBarcode39ExtendedText = loadFont("fonts/LibreBarcode39ExtendedText-Regular.ttf")
  libreBarcode39Extended = loadFont("fonts/LibreBarcode39Extended-Regular.ttf")

  // 日本語
  monomaniacOne = loadFont("fonts/MonomaniacOne-Regular.ttf")
  zenKurenaido = loadFont("fonts/ZenKurenaido-Regular.ttf")
  yujiHentaiganaAkari = loadFont("fonts/YujiHentaiganaAkari-Regular.ttf")
  yujiHentaiganaAkebono = loadFont("fonts/YujiHentaiganaAkebono-Regular.ttf")
}