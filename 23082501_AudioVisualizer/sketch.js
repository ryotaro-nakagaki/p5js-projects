let endFrameCount = Infinity
let startFrameCount = Infinity
flg = false

function preload() {
  sound = loadSound('./audio/audio.wav')
}

function setup() {
  cnv = createCanvas(1080, 1080)
  cnv.mouseClicked(handleMouseClicked)

  frameRate(60)
  capturer = new CCapture({
    framerate: getTargetFrameRate(),
    format: 'png',
    verbose: true
  })

  fft = new p5.FFT()

  noLoop()
}

function draw() {
  // background("white")

  if (flg) {
    capturer.start()
    flg = false
  }

  let waveform = fft.waveform()
  const margin = width / 10

  beginShape()
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, margin, width - margin)
    let y = map(waveform[i], -1, 1, margin, height - margin)
    vertex(x, y)
  }
  endShape()



  if (frameCount <= endFrameCount) {
    capturer.capture(cnv.canvas)
  }
  if (frameCount === endFrameCount) {
    capturer.stop()
    capturer.save()
  }
}

function handleMouseClicked() {
  loop()
  flg = true
  sound.play()
  startFrameCount = frameCount
  endFrameCount = ceil(getTargetFrameRate() * sound.duration() + frameCount + 1)
}