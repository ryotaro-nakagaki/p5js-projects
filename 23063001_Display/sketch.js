const AR = Object.freeze({
  W1_H1: 1 / 1,
  W4_H3: 3 / 4,
  W3_H4: 4 / 3,
  W16_H9: 9 / 16,
  W9_H16: 16 / 9
})
let imgs = [
  null, null, null,
  null, null, null,
  null, null, null
]
let inputs = []
let selectedAR = AR.W1_H1

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
  sel = createSelect()
  sel.position(10, 10)
  const keys = Object.keys(AR)
  for (let i = 0; i < keys.length; i++) {
    sel.option(keys[i])
  }
  sel.changed(() => { selectedAR = AR[sel.value()] })
}

function windowResized() { draw() }

function draw() {
  createCanvasByAR(selectedAR)
  background("#333")

  drawingContext.shadowOffsetX = 20
  drawingContext.shadowOffsetY = 20
  drawingContext.shadowBlur = 50
  drawingContext.shadowColor = "#000A"

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