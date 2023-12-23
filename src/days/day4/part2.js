const intersection = (xs, ys) => xs.filter(x => ys.includes(x))
const score = (times) => {
  let base = 0

  for (let i = 0; i < times; i++) {
    base = base > 0 ? base * 2 : 1
  }

  return base
}

// Wrong: 1288
// 14624680

export const part2 = (data) => {
  const lines = data.trim().split('\n')
  const copyCount = lines.map(() => 1)
  const parts = lines
    .map(line => line
      .split(/[:|]/g)
      .map(x => x.trim())
    )
    .map(([card, numbers, winners]) => [card, numbers, winners])
    .map(([card, numbers, winners]) => [
      Number.parseInt(card.replace(/[^0-9]/g, '')) - 1,
      numbers.split(' ').map(x => Number.parseInt(x)).filter(x => !Number.isNaN(x)),
      winners.split(' ').map(x => Number.parseInt(x)).filter(x => !Number.isNaN(x))
    ])
    .map(([card, numbers, winners]) => [
      card,
      intersection(numbers, winners).length
    ])

  parts.forEach(([card, winCount]) => {
    const copiesOfSelf = copyCount[card]

    for (let i = 1; i <= winCount; i++) {
      copyCount[card + i] += (1 * copiesOfSelf)
    }
  })

  return [lines, copyCount, copyCount.reduce((sum, x) => sum + x, 0), parts]
}