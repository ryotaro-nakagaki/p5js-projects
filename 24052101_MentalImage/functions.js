function init(title, isAnimated) {
  // シード値の初期化
  SEED = floor(fxrand() * (10 ** 16))
  console.log("Random seed: " + SEED)

  randomSeed(SEED)
  noiseSeed(SEED)

  // 作品タイトルの初期化
  TITLE = title
  document.title = TITLE

  // 色関係の初期化
  colorMode(HSB, 100)

  // 基準色
  console.log("HUE of main color: " + HUE)
  console.log("SAT of main color: " + SAT)
  console.log("BRI of main color: " + BRI)
  MAIN_COLOR = color(HUE, SAT, BRI)

  // 類似色
  numAnalogousColors = 4
  hueRangeAnalogousColors = 5
  ANALOGOUS_COLORS = []

  numAnalogousColors = floor(numAnalogousColors)
  for (
    let degree = -hueRangeAnalogousColors / 2;
    degree <= hueRangeAnalogousColors / 2;
    degree += hueRangeAnalogousColors / numAnalogousColors
  ) {
    ANALOGOUS_COLORS.push(color(HUE + degree, SAT, BRI))
  }

  // 補色
  COMPLEMENT_COLOR = color((HUE + 50) % 100, SAT, BRI / 3)

  // その他
  smooth()

  if (isAnimated) {
    frameRate(24) // Cinematic
  } else {
    noLoop()
  }
}

function popPalletColor({
  enableWhite = false,
  enableBlack = false,
  enableGrayColors = false,
  enableMainColor = false,
  enableAnalogousColors = false,
  enableComplementColor = false,
  enableTransp = false,
}) {
  let pallet = []

  // 白
  if (enableWhite) pallet.push(WHITE)

  // 黒
  if (enableBlack) pallet.push(BLACK)

  // 灰色
  if (enableGrayColors) {
    pallet.push(LIGHT_GRAY)
    pallet.push(GRAY)
    pallet.push(DARK_GRAY)
  }

  // 基準色
  if (enableMainColor) {
    for (let i = 0; i < 1; i++) {
      pallet.push(MAIN_COLOR)
    }
  }

  // 類似色
  if (enableAnalogousColors) {
    for (let i = 0; i < ANALOGOUS_COLORS.length; i++) {
      pallet.push(ANALOGOUS_COLORS[i])
    }
  }

  // 補色
  if (enableComplementColor) {
    pallet.push(COMPLEMENT_COLOR)
  }

  // 透過色
  if (enableTransp) {
    for (let i = 0; i < 1; i++) {
      pallet.push(TRANSP)
    }
  }

  // 引数がすべてfalseの場合はパレットに白を入れておく
  if (pallet.length === 0) {
    pallet.push(WHITE)
  }

  return random(pallet)
}

// サイコロ
function dice(numSurface) {
  return numSurface === 0
    ? false
    : floor(random(10000)) % numSurface === 0
}

function chooseRandomAR() {
  return random(Object.values(AR))
}

function createCanvasByAR(ar) {
  ar < windowHeight / windowWidth ?
    createCanvas(windowWidth, windowWidth * ar) :
    createCanvas(windowHeight / ar, windowHeight)
}

function createCanvasByResolution(Resolution) {
  createCanvas(Resolution.x, Resolution.y)
}

function translateCallback(x, y, CallbackFuncion) {
  translate(x, y)
  CallbackFuncion()
  translate(-x, -y)
}

function rotateCallback(theta, CallbackFuncion) {
  const rad = radians(theta)
  rotate(rad)
  CallbackFuncion()
  rotate(-rad)
}

// 背景を追加する関数
function addBackground({
  bgColor = WHITE,
  isGradientEnabled = false,
  isConcentrationLineEnabled = false,
  concentrationLineColor = TRANSP
}) {
  // 背景を単色で塗る
  colorMode(HSB, 100)
  background(bgColor)

  // グラデーションを追加する
  if (isGradientEnabled) {
    colorMode(HSB, 100)
    const img = createImage(width, height)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const c = color(
          0, 0, 100 * (1 - y / height), 50)
        img.set(x, y, c)
      }
    }
    img.updatePixels(), image(img, 0, 0)

    if (isConcentrationLineEnabled) {
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
          fill(concentrationLineColor)
          triangle(0, 0, point1.x, point1.y, point2.x, point2.y)

          stroke(concentrationLineColor)
          noiseLine(0, 0, point1.x, point1.y)
          noiseLine(0, 0, point2.x, point2.y)
        }
      })
    }
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

  noFill()
  beginShape()
  for (let i = 0; i <= dl; i += 1) {
    const sd = FRAME_WIDTH / 100
    vertex(
      v1.x + dv.x * i / dl
      + randomGaussian(0, randomGaussian(0, sd)),
      v1.y + dv.y * i / dl
      + randomGaussian(0, randomGaussian(0, sd))
    )
  }
  endShape()
}

function addSignature(string, font, color) {
  noStroke(), fill(color)
  textFont(font), textSize(FRAME_WIDTH / 2), textAlign(RIGHT, TOP)
  text(string, width - FRAME_WIDTH, height - FRAME_WIDTH)
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

function drawPixelArt({
  bitmap = [],
  x = 0, y = 0,
  pixelSize = 10,
  strokeColor = BLACK,
  fillColor = WHITE,
  isVerticalStripeEnabled = false,
  isHorizontalStripeEnabled = false,
  isSlashEnabled = false,
  isBackSlashEnabled = false
}) {
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
            // 縦縞模様
            if (isVerticalStripeEnabled) {
              for (let i = -1 / 2; i <= 1 / 2; i += 1 / 6) {
                noiseLine(
                  pixelSize * i, -pixelSize * 1 / 2,
                  pixelSize * i, +pixelSize * 1 / 2
                )
              }
            }

            // 横縞模様
            if (isHorizontalStripeEnabled) {
              for (let i = -1 / 2; i <= 1 / 2; i += 1 / 6) {
                noiseLine(
                  -pixelSize * 1 / 2, pixelSize * i,
                  +pixelSize * 1 / 2, pixelSize * i
                )
              }
            }

            // スラッシュ（/）方向の縞模様
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

            // バックスラッシュ（\）方向の縞模様
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

function chooseRandomBitmap() {
  return random(Object.values(BITMAP))
}

function addPaperTexture({
  isDotEnabled = false,
  isFiberEnabled = false,
  isNoiseEnabled = false,
  isFadeEnabled = false,
  isUnevenEnabled = false,
  isFoldLineEnabled = false,
}) {
  // 白飛びの描画
  if (isDotEnabled) {
    const img = createImage(width, height)
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        if (dice(1000)) img.set(x, y, color(GRAY))
      }
    }
    img.updatePixels()
    image(img, 0, 0)
  }

  // 繊維の描画
  if (isFiberEnabled) {
    noFill(), colorMode(RGB, 100)
    for (let y = 0; y <= height; y += FRAME_WIDTH / 10) {
      for (let x = 0; x <= width; x += FRAME_WIDTH / 10) {
        stroke(color(100, random(20, 50)))
        strokeWeight(FRAME_WIDTH / random(500, 1000))
        beginShape()
        for (let i = 0; i < 4; i++) {
          curveVertex(
            x + randomGaussian(0, FRAME_WIDTH / 2),
            y + randomGaussian(0, FRAME_WIDTH / 2)
          )
        }
        endShape()
      }
    }
  }

  // ピクセルノイズの描画
  if (isNoiseEnabled) {
    rectMode(CORNER)
    colorMode(RGB, 100)

    const img = createImage(width, height)
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        img.set(x, y, color(100 * random(), 100 * random(), 100 * random(), 16))
      }
    }
    img.updatePixels(), image(img, 0, 0)
  }

  // 紙の色褪せの描画
  if (isFadeEnabled) {
    noStroke(), fill(color(100, 100, 0, 5))
    rect(0, 0, width, height)
  }

  // インクのむらの描画
  if (isUnevenEnabled) {
    colorMode(RGB, 100)
    const offset = { x: randomGaussian(), y: randomGaussian() }
    const img = createImage(width, height)
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        img.set(x, y, color(100 * noise(offset.x + x / 500, offset.y + y / 500), 10))
      }
    }
    img.updatePixels()
    image(img, 0, 0)
  }

  // 折り目の描画
  if (isFoldLineEnabled) {
    drawingContext.shadowBlur = 25
    drawingContext.shadowColor = BLACK
    stroke(WHITE)
    strokeWeight(FRAME_WIDTH / 500)

    for (let i = 0; i < 4; i++) {
      dice(2)
        ? line(random(width), 0, random(width), height) // 上辺から下辺への線 
        : line(0, random(height), width, random(height)) // 右辺から左辺への線
    }

    drawingContext.shadowBlur = 0
    drawingContext.shadowColor = TRANSP
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
  Micro5Regular = loadFont("fonts/Micro5-Regular.ttf")

  // バーコード
  libreBarcode39ExtendedText = loadFont("fonts/LibreBarcode39ExtendedText-Regular.ttf")
  libreBarcode39Extended = loadFont("fonts/LibreBarcode39Extended-Regular.ttf")

  // 日本語
  monomaniacOne = loadFont("fonts/MonomaniacOne-Regular.ttf")
  zenKurenaido = loadFont("fonts/ZenKurenaido-Regular.ttf")
  yujiHentaiganaAkari = loadFont("fonts/YujiHentaiganaAkari-Regular.ttf")
  yujiHentaiganaAkebono = loadFont("fonts/YujiHentaiganaAkebono-Regular.ttf")
}