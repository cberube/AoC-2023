const aperture2 = xs => xs
  .reduce((pairs, x, idx) => idx > 0 ? [...pairs, [xs[idx - 1], x]] : pairs, [])
const expand2 = xs => xs
  .reduce((out, [a, b], idx) => idx === xs.length - 1 ? [...out, a, b] : [...out, a], [])

export const part = (data) => {
  const lines = data.trim().split('\n')
  const pointList = lines.map(x => x.split(' ').map(y => Number.parseInt(y)))

  const reductions = pointList
    .map(aperture2)
    .map(pairs => {
      let currentList = pairs
      const lists = [currentList]

      const allZero = pairs => pairs.reduce((truth, [a, b]) => truth && a === 0 && b === 0, true)

      do {
        currentList = aperture2(currentList.map(([a, b]) => b - a))
        console.log(currentList)
        lists.push(currentList)
      } while (!allZero(currentList))

      return lists
    })

  const expansions = reductions
    .map(reductionList => {
      return reductionList.map(expand2)
    })

  return { expansions, lines, pointList, reductions }
}