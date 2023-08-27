const w = 1440 / 8, h = 1080 / 8
const fr = 6

function preload() {
  sound = loadSound('./audio/audio.wav')
}

function setup() {
  createCanvas(w, h)
  frameRate(fr)
  fft = new p5.FFT()

  noLoop()
}

function draw() {
  FRAME_WIDTH = min(width, height) / 10

  {
    stroke("black")
    strokeWeight(1)
    noFill()
  }

  {
    background("white")

    drawWaveform(FRAME_WIDTH, FRAME_WIDTH, width - FRAME_WIDTH, height - FRAME_WIDTH)

    // text(frameCount, FRAME_WIDTH, FRAME_WIDTH)

    addFrame("white", "black", FRAME_WIDTH)
    addPaperTexture(true, false, true, false)
  }

  saveCanvas(("0000000" + frameCount).slice(-7), "png")

  if (frameCount === ceil(getTargetFrameRate() * sound.duration())) {
    noLoop()
    sound.stop()
  }

}

function keyTyped() {
  if (key === 's') {
    loop()
    sound.play()
  }
}

function drawWaveform(x1, y1, x2, y2) {
  const waveform = fft.waveform(256)
  console.log(waveform.length)

  beginShape()
  for (let i = 0; i < 256; i++) {
    let x = map(i, 0, 256, x1, x2)
    let y = map(waveform[i], -1, 1, y2, y1)
    curveVertex(x, y)
  }
  endShape()
}