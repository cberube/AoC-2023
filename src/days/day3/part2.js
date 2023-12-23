const numberPattern = /[0-9]/
const symbolPattern = /[^0-9.]/

const at = (x, y) => ({ x, y })
const run = (x1, x2, y) => {
  const out = []

  for (let i = x1; i <= x2; i++) {
    out.push(at(i, y))
  }

  return out
}

const setsOverlap = (a, b) =>
  Array.from(a.values()).reduce((truth, x) => truth || b.has(x), false)


// 78236071

export const part2 = (data) => {
  const lines = data.trim().split('\n').map(line => line.trim())
  const width = lines[0].length
  // const height = lines.length

  const getAt = (x, y) => lines?.[y]?.[x]

  // Find all the numbers and record them, along
  // with their row and column extents
  const numbers = lines.flatMap(
    (_, y) => {
      const numbersOnLine = []
      let currentNumber = []
      let currentStart = -1

      for (let x = 0; x < width; x++) {
        const v = getAt(x, y)

        if (!numberPattern.test(v)) {
          if (currentNumber.length) {
            numbersOnLine.push({
              value: currentNumber.join(''),
              x1: currentStart,
              x2: x - 1,
              y,
              neighbors: [
                at(currentStart - 1, y),
                at(x, y),
                ...run(currentStart - 1, x, y - 1),
                ...run(currentStart - 1, x, y + 1)
              ]
            })
            currentNumber = []
            currentStart = -1
          }

          continue
        }

        if (!currentNumber.length) {
          currentStart = x
        }

        currentNumber.push(v)
      }

      if (currentNumber.length) {
        numbersOnLine.push({
          value: currentNumber.join(''),
          x1: currentStart,
          x2: width - 1,
          y,
          neighbors: [
            at(currentStart - 1, y),
            at(width, y),
            ...run(currentStart - 1, width, y - 1),
            ...run(currentStart - 1, width, y + 1)
          ]
        })
      }

      return numbersOnLine
    }
  )

  // For each number check all its neighbors for gear
  // symbols (*)
  const symbolChecks = numbers.map(
    number => ({
      ...number,
      neighbors: null,
      gearLocations: new Set(
        number.neighbors.map(
          p => getAt(p.x, p.y) === '*'
            ? `${p.x}:${p.y}`
            : undefined
        )
          .filter(x => x)
      )
    })
  )

  const gears = symbolChecks
    .filter(number => number.gearLocations.size)
  //.map(number => Number.parseInt(number.value))

  // For each gear check to see if any other gears share its
  // gear symbol location
  const alreadyPaired = new Set()
  const pairedGears = gears
    .map((gear, idx) => {
      if (alreadyPaired.has(gear)) return undefined

      const matches = gears.filter(
        (otherGear, otherIdx) => otherIdx !== idx
          && setsOverlap(otherGear.gearLocations, gear.gearLocations)
      )
      
      matches.forEach(gear => alreadyPaired.add(gear))

      return {
        ...gear,
        matchingGears: matches
      }
    })
    .filter(x => x && x.matchingGears.length === 1)
    .map(x => ([
      Number.parseInt(x.value),
      Number.parseInt(x.matchingGears[0].value)
    ]))
    .map(gear => gear[0] * gear[1])

  const sumOfPartNumbers = pairedGears.reduce((sum, x) => sum + x, 0)

  // return [sumOfPartNumbers, lines, pairedGears, gears, symbolChecks, numbers]
  return sumOfPartNumbers
}