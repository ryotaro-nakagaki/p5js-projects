const AR = Object.freeze({
  W1_H1: 1 / 1,
  W4_H3: 3 / 4,
  W3_H4: 4 / 3,
  W16_H9: 9 / 16,
  W9_H16: 16 / 9
})
const THEME = Object.freeze({
  LIGHT: "#DDD",
  DARK: "#333"
})

let imgs = [
  null, null, null,
  null, null, null,
  null, null, null
]
let inputs = []
let selectedAR = AR.W1_H1
let selectedTheme = THEME.LIGHT

function setup() {
  // ファイルインプットの初期化
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const idx = 3 * y + x
      inputs[idx] = createFileInput((file) => {
        if (file.type === 'image') {
          imgs[idx] = createImg(file.data)
          imgs[idx].hide()
        } else {
          imgs[idx] = null
        }
      })
    }
  }

  // セレクトボックスの初期化
  {
    sel1 = createSelect()
    sel1.position(10, 10)
    const keys = Object.keys(AR)
    for (let i = 0; i < keys.length; i++) {
      sel1.option(keys[i])
    }
    sel1.changed(() => { selectedAR = AR[sel1.value()] })
  }

  {
    sel2 = createSelect()
    sel2.position(10, 40)
    const keys = Object.keys(THEME)
    for (let i = 0; i < keys.length; i++) {
      sel2.option(keys[i])
    }
    sel2.changed(() => { selectedTheme = THEME[sel2.value()] })
  }
}

function windowResized() { draw() }

function draw() {
  createCanvasByAR(selectedAR)
  background(selectedTheme)

  drawingContext.shadowOffsetX = 15
  drawingContext.shadowOffsetY = 15
  drawingContext.shadowBlur = 25
  drawingContext.shadowColor = "#0003"

  padding = 2 * min(width, height) / 25

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const idx = 3 * y + x

      const horizontal = x * width / 3 + (1 - x / (3 - 1)) * padding
      const vertical = y * height / 3 + (1 - y / (3 - 1)) * padding

      const imgWidth = width / 3 - padding
      const imgHeight = height / 3 - padding

      // ファイルインプットを配置
      inputs[idx].position(
        cnvOffsetX + horizontal + 10,
        cnvOffsetY + vertical + 10
      )

      // 画像を配置
      fill("black"), stroke("white")
      rect(horizontal, vertical, imgWidth, imgHeight)
      if (imgs[idx]) {
        image(imgs[idx], horizontal, vertical, imgWidth, imgHeight)
      }
    }
  }
}

function createCanvasByAR(AR) {
  cnv = AR < windowHeight / windowWidth ?
    createCanvas(windowWidth, windowWidth * AR) :
    createCanvas(windowHeight / AR, windowHeight)
  cnvOffsetY = cnv.elt.offsetTop
  cnvOffsetX = cnv.elt.offsetLeft
}

function keyTyped() { if (key === 's') saveCanvas() }