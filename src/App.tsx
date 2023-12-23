import { Inspector } from 'react-inspector'
import './App.css'

import { day as day1 } from './days/day1'
import { day as day2 } from './days/day2'
import { day as day3 } from './days/day3'
import { day as day4 } from './days/day4'
import { day as day5 } from './days/day5'
import { day as day6 } from './days/day6'
import { day as day7 } from './days/day7'
import { day8 } from './days'
import { day9 } from './days'
import { day10 } from './days'

const problemMap = {
  day1,
  day2,
  day3,
  day4,
  day5,
  day6,
  day7,
  day8,
  day9,
  day10
}

function App() {
  const day = 10
  const part = 1
  const input = 'sample2'
  const result = problemMap[`day${day}`][`part${part}`](problemMap[`day${day}`][input])

  return (
    <>
      <Inspector data={result} expandLevel={10} />
    </>
  )
}

export default App
