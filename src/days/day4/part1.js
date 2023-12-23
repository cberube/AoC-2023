const intersection = (xs, ys) => xs.filter(x => ys.includes(x))
const score = (times) => {
  let base = 0

  for (let i = 0; i < times; i++) {
    base = base > 0 ? base * 2 : 1
  }

  return base
}

export const part1 = (data) => {
  const lines = data.trim().split('\n')
  const parts = lines
    .map(line => line
      .split(/[:|]/g)
      .map(x => x.trim())
    )
    .map(([_, numbers, winners]) => [numbers, winners])
    .map(([numbers, winners]) => [
      numbers.split(' ').map(x => Number.parseInt(x)).filter(x => !Number.isNaN(x)),
      winners.split(' ').map(x => Number.parseInt(x)).filter(x => !Number.isNaN(x))
    ])
    .map(([numbers, winners]) => intersection(numbers, winners).length)
    .map(x => score(x))
    .reduce((sum, x) => sum + x, 0)

  return [lines, parts]
}