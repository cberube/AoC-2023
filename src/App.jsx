import { Inspector } from 'react-inspector'
import './App.css'

import { day as day1 } from './day1'
import { day as day2 } from './day2'
import { day as day3 } from './day3'
import { day as day4 } from './day4'
import { day as day5 } from './day5'
import { day as day6 } from './day6'
import { day as day7 } from './day7'

const problemMap = {
  day1,
  day2,
  day3,
  day4,
  day5,
  day6,
  day7
}

function App() {
  const result = problemMap.day7.part1(problemMap.day7.data.input);

  return (
    <>
      <Inspector data={result} expandLevel={10} />
    </>
  )
}

export default App
