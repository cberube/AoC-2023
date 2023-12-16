import './App.css'

import { day8 } from './days'
import { day9 } from './days'

const problems = {
  day8,
  day9
}

function App() {
  const result = problems.day9.part1(problems.day9.sample1)

  return (
    <pre>{JSON.stringify(result, null, 2)}</pre>
  )
}

export default App
