const keyByName = xs => xs.reduce(
  (o, x) => {
    o[x.name] = x
    return o
  },
  {}
)

// Delicious: 12 030 780 859 469

export const part = (data) => {
  const [instructionData, nodeData] = data.trim().split('\n\n')

  const instructions = instructionData.split('')
  const nodes = nodeData
    .split('\n')
    .map(x => x.split('=').map(y => y.trim()))
    .map(([name, connections]) => ({
      name,
      connections: connections
        .replace(/[()]/g, '')
        .split(',')
        .map(x => x.trim())
    }))
    .map(node => ({
      name: node.name,
      L: node.connections[0],
      R: node.connections[1]
    }))

  const nodeMap = keyByName(nodes)

  const walkers = []

  // Create one walker for each node that ends in A
  nodes.forEach(node => {
    if (!node.name.endsWith('A')) return

    walkers.push({
      currentNode: node.name,
      instructionIdx: 0,
      finished: false,
      count: 0
    })
  })

  // return walkers

  //const allWalkersFinished = () => walkers.reduce((truth, walker) => truth && walker.currentNode.endsWith('Z'), true)
  const allWalkersFinished = () => walkers.reduce((truth, walker) => truth && walker.finished, true)

  const safetyLimit = 64e6
  let count = 0

  const gcd = (a, b) => {
    let x = a
    let y = b

    while (x != y) {
      if (x > y) x = x - y
      else y = y - x
    }

    return x
  }

  const gcdMany = (xs) => {
    let result = xs.shift()

    while (xs.length > 0 && result > 1) {
      result = gcd(result, xs.shift())
    }

    return result
  }

  const lcm = (a, b) => {
    return (a * b) / gcd(a, b)
  }

  const lcmMany = (xs) => {
    let result = xs.shift()

    while (xs.length > 0 && result > 1) {
      result = lcm(result, xs.shift())
    }

    return result
  }

  // return lcmMany([10, 15, 17])

  while (!allWalkersFinished() && count++ < safetyLimit) {
    walkers.forEach(walker => {
      if (walker.finished) return

      const instruction = instructions[walker.instructionIdx]

      walker.instructionIdx = (walker.instructionIdx + 1) % instructions.length

      const nextNode = nodeMap[walker.currentNode][instruction]

      walker.currentNode = nextNode
      walker.count = walker.count + 1

      walker.finished = walker.currentNode.endsWith('Z')
    })
  }

  const lcmResult = lcmMany(walkers.map(x => x.count))

  return { count, lcmResult, walkers }
}