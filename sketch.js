//----- Attempt at Conway's Game of Life P5 -----//

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
  createCanvas(1200, 600)
  world = []
  for (let i = 0; i < 60; i++)
    world.push([...Array(120)].map(_ => ~~(Math.random() * 2)))
}

function draw () {
  const newWorld = [...world.map(row => [...row])]
  for (let i = 0; i < 120; i++) {
    for (let j = 0; j < 60; j++) {
      const hood = neighbors(j, i)
      if (hood < 2 || hood > 3) {
        newWorld[j][i] = 0
      } else if (hood === 3) {
        newWorld[j][i] = 1
      }
      newWorld[j][i] ? fill(190, 0, 0) : fill(160)
      square(10 * i, 10 * j, 9)
    }
  }
  world = [...newWorld.map(row => [...row])]
}

function neighbors (r, c) {
  return neighborhood.reduce((n, [dy, dx]) => {
    const [cr, cc] = [r + dy, c + dx]
    return n + world[cr >= 60 ? 0 : cr < 0 ? 59 : cr][cc >= 120 ? 0 : cc < 0 ? 119 : cc]
  }, 0)
}

function mouseClicked () {
  if (mouseX >= 0 && mouseY >= 0 && mouseX < 1200 && mouseY < 600)
    world[~~(mouseY / 10)][~~(mouseX / 10)] = 3
}
