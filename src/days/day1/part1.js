export const part1 = (data) => {
  const lines = data.trim().split('\n')

  // Only digits matter
  const digitLines = lines
    .map(x => x.replace(/[^0-9]/g, ''))

  // And only the first and last
  const pairs = digitLines
    .map(x => ([x.slice(0, 1), x.slice(-1)]))
    .map(xs => xs.join(''))

  // Convert to numbers
  const numericValues = pairs.map(x => Number.parseInt(x))

  // And sum
  const sum = numericValues.reduce((sum, value) => sum + value, 0)

  return sum
}
