// Correct: 174137457

export const part1 = (data) => {
  const lines = data.trim().split('\n')

  const seeds = lines.shift().split(' ').slice(1).map(s => Number.parseInt(s))

  // Discard the separator between the seeds
  // and the maps
  lines.shift()

  let mapName
  let currentMap = []

  const mapOfMaps = {}

  do {
    const line = lines.shift().trim()

    if (line.length < 1) {
      if (mapName) {
        mapOfMaps[mapName] = currentMap.sort((a, b) => a[0] - b[0])
      }

      mapName = null
      currentMap = []
      continue
    }

    if (!mapName) {
      mapName = line.split(' ').shift()
      continue
    }

    const [destinationStart, sourceStart, length] = line.split(' ').map(x => Number.parseInt(x))
    currentMap.push([sourceStart, destinationStart, length])

  } while (lines.length)

  // Make sure not to miss the last map!
  if (mapName) {
    mapOfMaps[mapName] = currentMap.sort((a, b) => a[0] - b[0])
  }

  const lookup = (mapName, value) => {
    const map = mapOfMaps[mapName]

    for (let i = 0; i < map.length; i++) {
      const range = map[i]

      if (range[0] <= value && range[0] + range[2] - 1 >= value) {
        return range[1] + (value - range[0])
      }
    }

    return value
  }

  const result = seeds.map(seed => {
    const o = { seed }

    o.soil = lookup('seed-to-soil', seed)
    o.fertilizer = lookup('soil-to-fertilizer', o.soil)
    o.water = lookup('fertilizer-to-water', o.fertilizer)
    o.light = lookup('water-to-light', o.water)
    o.temperature = lookup('light-to-temperature', o.light)
    o.humidity = lookup('temperature-to-humidity', o.temperature)
    o.location = lookup('humidity-to-location', o.humidity)

    return o
  })

  const closest = result.reduce((best, seed) => Math.min(best, seed.location), Number.MAX_SAFE_INTEGER)

  return [closest, result, seeds, mapOfMaps, lines]
  // return closest
}