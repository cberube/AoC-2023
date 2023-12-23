import { compose } from "crocks"

const splitGames = xs => xs.flatMap(x => x.split(';'))
const splitColors = xs => xs.map(x => x.split(','))
const splitTurns = xs => xs
  .map(
    ys => ys
      .map(x => x.trim().split(' '))
  )
const findMaxPerColor = turns => {
  return turns.reduce(
    (max, ys) => {
      ys.forEach(([count, color]) => {
        max[color] = Math.max(max[color], count)
      })

      return max
    },
    { red: 0, green: 0, blue: 0 }
  )
}

const reshapeGameData = compose(
  findMaxPerColor,
  splitTurns,
  splitColors,
  splitGames
)

const extractGameId = x => Number.parseInt(x.replace(/[^0-9]/g, ''))

// Too low: 1865
// 2285

export const part1 = (data) => {
  const lines = data.trim().split('\n')
  const parts = lines.map(line => line.split(':'))

  const limits = {
    red: 12,
    green: 13,
    blue: 14
  }

  const result = parts
    .map(xs => [
      extractGameId(xs[0]),
      reshapeGameData(xs.slice(1))
    ])
    .filter(
      ([_, maxCubes]) =>
        maxCubes.red <= limits.red
        && maxCubes.green <= limits.green
        && maxCubes.blue <= limits.blue
    )
    .map(([id]) => id)
    .reduce((sum, id) => sum + id, 0)

  return result
}