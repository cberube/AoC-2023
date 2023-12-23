import { sum } from '../../helpers'

const aperture2 = xs => xs
  .reduce((pairs, x, idx) => idx > 0 ? [...pairs, [xs[idx - 1], x]] : pairs, [])
const expand2 = xs => xs
  .reduce((out, [a, b], idx) => idx === xs.length - 1 ? [...out, a, b] : [...out, a], [])

// 1842168671

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
        lists.push(currentList)
      } while (!allZero(currentList))

      return lists
    })

  const expansions = reductions
    .map(reductionList => {
      return reductionList.map(expand2)
    })

  const extended = expansions
    .map((expansionList) => {
      for (let idx = expansionList.length - 1; idx >= 0; idx--) {
        const e = expansionList[idx]

        if (idx === expansionList.length - 1) {
          e.push(0)
          continue
        }

        const below = expansionList[idx + 1]
        const belowValue = below[below.length - 1]
        const left = e[e.length - 1]

        e.push(belowValue + left)
      }

      return expansionList
    })

  const result = extended
    .map(xs => xs.shift().pop())
    .reduce(sum)
  //.map(reductionList => reductionList.reverse())

  // return result
  return { result, extended, expansions, lines, pointList, reductions }
}