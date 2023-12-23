// Correct: 1493866

export const part2 = (data) => {
  const lines = data.trim().split('\n')

  const seeds = lines
    .shift()
    .split(' ')
    .slice(1)
    .map(s => Number.parseInt(s))

  const seedRanges = []

  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push([
      seeds[i],
      seeds[i] + seeds[i + 1] - 1
    ])
  }

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
    currentMap.push({
      sourceStart,
      sourceEnd: sourceStart + length - 1,
      destinationStart,
      destinationEnd: destinationStart + length - 1,
      offset: destinationStart - sourceStart
    })

  } while (lines.length)

  // Make sure not to miss the last map!
  if (mapName) {
    mapOfMaps[mapName] = currentMap.sort((a, b) => a[0] - b[0])
  }

  // Returns [mapped, ...unmapped]
  const intersectRanges = (a, b) => {
    // a is entirely before b
    if (a.end < b.sourceStart) return [null, a]

    // a is entirely after b
    if (a.start > b.sourceEnd) return [null, a]

    // a is entirely contained in b
    if (a.start >= b.sourceStart && a.end <= b.sourceEnd) {
      return [
        { start: a.start + b.offset, end: a.end + b.offset }
      ]
    }

    // a overlaps the beginning of b
    if (a.start < b.sourceStart && a.end <= b.sourceEnd) {
      return [
        { start: b.sourceStart + b.offset, end: a.end + b.offset },
        { start: a.start, end: b.sourceStart - 1 }
      ]
    }

    // a overlaps the end of b
    if (a.start >= b.sourceStart && a.end > b.sourceEnd) {
      return [
        { start: a.start + b.offset, end: b.sourceEnd + b.offset },
        { start: b.sourceEnd + 1, end: a.end }
      ]
    }

    // a contains b
    if (a.start <= b.sourceStart && a.end >= b.sourceEnd) {
      return [
        { start: b.sourceStart + b.offset, end: b.sourceEnd + b.offset },
        { start: a.start, end: b.sourceStart - 1 },
        { start: b.sourceEnd + 1, end: a.end }
      ]
    }

    // Unknown case!
    console.log('UNKNOWN', a, b)
    return null
  }

  const passThroughMap = (rangesToMap, maps) => {
    let unmappedRanges = Array.isArray(rangesToMap) ? rangesToMap : [rangesToMap]
    let mappedRanges = []

    console.log('passThroughMap', JSON.stringify(unmappedRanges))

    maps.forEach(b => {
      let nextUnmapped = []

      while (unmappedRanges.length > 0) {
        const a = unmappedRanges.shift()
        console.log(JSON.stringify(a))
        const [mapped, ...unmapped] = intersectRanges(a, b)
        console.log(JSON.stringify(mapped), JSON.stringify(unmapped))

        const un = (Array.isArray(unmapped) ? unmapped : [unmapped])
        un.forEach(xs => nextUnmapped.push(xs))

        if (mapped) mappedRanges.push(mapped)
      }

      unmappedRanges = nextUnmapped
    })

    console.log(mappedRanges)

    return [...mappedRanges, ...unmappedRanges]
  }

  const result = seedRanges.map(([start, end]) => {
    const range = { start, end }
    const o = { seed: [{ ...range }] }

    const mapList = [
      'seed-to-soil',
      'soil-to-fertilizer',
      'fertilizer-to-water',
      'water-to-light',
      'light-to-temperature',
      'temperature-to-humidity',
      'humidity-to-location'
    ]

    let previous = o.seed
    for (let i = 0; i < mapList.length; i++) {
      console.log(previous)

      const next = passThroughMap(
        [...previous],
        mapOfMaps[mapList[i]]
      )

      previous = next
      o[mapList[i]] = next
    }

    return o
  })

  const closest = result
    .flatMap(seed => seed['humidity-to-location'])
    .map(location => location.start)
    .reduce((best, x) => Math.min(best, x), Number.MAX_SAFE_INTEGER)

  return closest
  return [seedRanges, closest, result, mapOfMaps]

  // return [closest, result, seeds, mapOfMaps, lines]
}