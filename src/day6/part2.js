const zip = (xs, ys) => xs.reduce(
  (out, x, i) => [...out, [x, ys[i]]],
  []
)

export const part2 = (data) => {
  const lines = data
    .trim()
    .split('\n')
    .map(x => x.replace(/[^:]+:\s+/, ''))
    .map(x => x.split(' ').filter(x => x.length).join(''))
    .map(x => Number.parseInt(x))

  const races = [lines]

  // return { lines, races }

  const results = races
    .map(([time, distance]) => {
      const out = []

      for (let i = 0; i <= time; i++) {
        out.push(i * (time - i))
      }

      return out.filter(x => x > distance)
    })
    .map(winningTimes => winningTimes.length)
    .reduce((product, x) => product * x, 1)

  return { lines, races, results }
}