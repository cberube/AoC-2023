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

// Too low: 530923
// 533775

export const part1 = (data) => {
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

  // For each number check all its neighbors for symbols
  // (a symbol is anything that isn't a digit or a '.')
  const symbolChecks = numbers.map(
    number => ({
      ...number,
      hasSymbol: number.neighbors
        .map(p => getAt(p.x, p.y))
        .map(v => !!(v && symbolPattern.test(v)))
        .reduce((truth, x) => truth || x, false)
    })
  )

  const partNumbers = symbolChecks
    .filter(number => number.hasSymbol)
    .map(number => Number.parseInt(number.value))

  const sumOfPartNumbers = partNumbers.reduce((sum, x) => sum + x, 0)

  // return [sumOfPartNumbers, lines, partNumbers, symbolChecks, numbers]
  return sumOfPartNumbers
}