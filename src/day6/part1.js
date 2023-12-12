const zip = (xs, ys) => xs.reduce(
  (out, x, i) => [...out, [x, ys[i]]],
  []
)

export const part1 = (data) => {
  const lines = data
    .trim()
    .split('\n')
    .map(x => x.replace(/[^:]+:\s+/, ''))
    .map(x => x.split(' ').filter(x => x.length))

  const races = zip(lines[0], lines[1])

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