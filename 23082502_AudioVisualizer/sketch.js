function preload() {
  sound = loadSound('./audio/audio.wav')
}

function setup() {
  createCanvas(1080 / 4, 1080 / 4)

  frameRate(60)

  // fft = new p5.FFT()

  noLoop()
}

function draw() {
  // let waveform = fft.waveform()

  // beginShape()
  // for (let i = 0; i < waveform.length; i++) {
  //   let x = map(i, 0, waveform.length, 0, width)
  //   let y = map(waveform[i], -1, 1, 0, height)
  //   vertex(x, y)
  // }
  // endShape()

  background("white")
  text(frameCount, width / 2, height / 2)
}

function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', getTargetFrameRate() * sound.duration(), { units: "frames" })
    loop()
    sound.play()
  }
}