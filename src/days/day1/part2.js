// Too low: 49940
// Too low: 52470
// 54530
// Too high: 54549

export const part2 = (data) => {
  const lines = data.trim().split('\n')

  // Convert number words into digits
  const wordList = [
    'one', 'two', 'three',
    'four', 'five', 'six',
    'seven', 'eight', 'nine'
  ]

  const regex = new RegExp('[0-9]|one|two|three|four|five|six|seven|eight|nine')

  const translatedLines = lines.map(
    x => {
      const first = regex.exec(x).shift()
      let second = null

      for (let i = 1; i < x.length + 1 && !second; i++) {
        second = regex.exec(x.slice(-i))
        if (second) second = second.shift()
      }

      const firstIdx = wordList.findIndex(x => x === first)
      const secondIdx = wordList.findIndex(x => x === second)

      return [
        firstIdx >= 0 ? firstIdx + 1 : first,
        secondIdx >= 0 ? secondIdx + 1 : second
      ]
    }
  )


  // And only the first and last
  const pairs = translatedLines
    .map(xs => xs.join(''))

  // Convert to numbers
  const numericValues = pairs.map(x => Number.parseInt(x))

  // And sum
  const sum = numericValues.reduce((sum, value) => sum + value, 0)

  return sum

}
