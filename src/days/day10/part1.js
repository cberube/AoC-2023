const Pipe = (connections) => (connections)

const symbolMap = {
  '|': 'NS',
  '-': 'EW',
  'L': 'NE',
  'J': 'NW',
  '7': 'SW',
  'F': 'SE',
}

const inverseDirections = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E'
}

const directionOffsets = {
  N: [0, -1],
  S: [0, 1],
  E: [1, 0],
  W: [-1, 0]
}

const ortho = ['N', 'S', 'E', 'W']

export const part = (data) => {
  const lines = data.trim().split('\n').map(line => line.split(''))

  let startPosition = [null, null]

  const pipes = lines.map((line, y) => line.map((symbol, x) => {
    if (symbol === 'S') startPosition = [x, y]
    return symbolMap[symbol]
  }))

  const connectedPositions = (x, y) => {
    const connections = getAt(x, y)
    return connections
      ? connections.split('')
        //.map(dir => inverseDirections[dir])
        .map(dir => directionOffsets[dir])
        .map(([ox, oy]) => ([x + ox, y + oy]))
      : []
  }

  const getAt = (x, y) => pipes?.[y]?.[x]

  // Determine the connections to the start tile
  const startConnections = []

  ortho.forEach(dir => {
    const inv = inverseDirections[dir]
    const offset = directionOffsets[dir]
    const other = getAt(startPosition[0] + offset[0], startPosition[1] + offset[1])
    if (other && other.includes(inv)) startConnections.push(dir)
  })

  // Update the start tile
  pipes[startPosition[1]][startPosition[0]] = startConnections.join('')

  // Begin at the start and flood-fill connected distances
  const workingSet = [[0, startPosition]]
  const visitedSet = new Set([startPosition.join(':')])
  const distances = pipes.map(line => line.map(col => -1))
  let i = 0

  while (workingSet.length > 0 && i++ < 10) {
    const [distance, position] = workingSet.shift()

    if (distances?.[position[1]]?.[position[0]] === undefined) {
      continue
    }

    distances[position[1]][position[0]] = distance

    const connected = connectedPositions(position[0], position[1])
    connected.forEach(connection => {
      if (visitedSet.has(connection.join(':'))) {
        return
      }
      workingSet.push([distance + 1, connection])
      visitedSet.add(connection.join(':'))
    })
  }

  const distanceList = distances.reduce((o, row) => [...o, ...row], [])
  const farthest = distanceList.reduce((max, x) => Math.max(x, max), 0)

  return pipes.map((row, y) => row.map((pipe, x) => connectedPositions(x, y)))
  return { farthest, map: distances.map(line => line.map(v => `${v}`.length < 2 ? ` ${v}` : v).join('|')), distances, pipes, startPosition, startConnections }
}