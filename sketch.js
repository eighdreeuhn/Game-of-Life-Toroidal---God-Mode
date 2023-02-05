//----- Attempt at Conway's Game of Life P5 -----//

const reverb = new Tone.Freeverb({
  roomSize: 0.5,
  dampening: 1000
}).toDestination()

const voice = new Tone.MonoSynth({
  envelope: {
    attack: 0.5,
    decay: 1,
    sustain: 1
  },
  oscillator: {
    type: 'fatsine'
  },
  volume: -6,
  portamento: 0.5
}).toDestination()

const hihat = new Tone.MetalSynth({ volume: -20 }).toDestination()

const loop = new Tone.Loop(time => {
  hihat.triggerAttackRelease('A6', '+2n')
}, '2m').start(0)

const neighborhood = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
]
let world = []

function setup () {
  Tone.Transport.start()
  createCanvas(1200, 600)
  noStroke()
  frameRate(30)
  world = []
  for (let i = 0; i < 120; i++)
    world.push([...Array(240)].map(_ => ~~(Math.random() * 2)))
}

function draw () {
  const newWorld = [...world.map(row => [...row])]
  for (let i = 0; i < 240; i++) {
    for (let j = 0; j < 120; j++) {
      const hood = neighbors(j, i)
      if (hood < 2 || hood > 3) {
        newWorld[j][i] = 0
      } else if (hood === 3) {
        newWorld[j][i] = 1
      }
      newWorld[j][i] ? fill(190, 0, 0) : fill(0, 130, 75)
      square(5 * i, 5 * j, 5)
    }
  }
  world = [...newWorld.map(row => [...row])]
}

function neighbors (r, c) {
  return neighborhood.reduce((n, [dy, dx]) => {
    const [cr, cc] = [r + dy, c + dx]
    return (
      n +
      world[cr >= 120 ? 0 : cr < 0 ? 119 : cr][
        cc >= 240 ? 0 : cc < 0 ? 239 : cc
      ]
    )
  }, 0)
}

function mouseClicked () {
  if (mouseX >= 0 && mouseY >= 0 && mouseX < 1200 && mouseY < 600) {
    hihat.triggerAttackRelease('8n')
    voice.triggerAttackRelease(Math.floor(Math.random() * 365) + 100, '4n')
    world[~~(mouseY / 5)][~~(mouseX / 5)] = 3
  }
}
