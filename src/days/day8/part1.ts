const keyByName = xs => xs.reduce(
  (o, x) => {
    o[x.name] = x
    return o
  },
  {}
)

// Too low: 201

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

  console.log(nodeMap)

  const safetyLimit = 1e6
  let currentNode = 'AAA'
  let instructionIdx = 0
  let count = 0

  const steps = []

  while (currentNode != 'ZZZ' && count++ < safetyLimit) {
    const instruction = instructions[instructionIdx]

    instructionIdx = (instructionIdx + 1) % instructions.length

    const nextNode = nodeMap[currentNode][instruction]

    steps.push({
      currentNode,
      nextNode,
      instructionIdx,
      instruction
    })

    currentNode = nextNode
  }

  return { count, instructions, steps }
}