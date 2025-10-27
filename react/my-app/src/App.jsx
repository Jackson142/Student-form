import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ClickButton from './components/clickevent'
import GreetUser from './components/passingArgument'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ClickButton />
      <GreetUser />

      <div>
        <h1>Vite + React</h1>
        <img src={reactLogo} alt="React Logo" />
        <img src={viteLogo} alt="Vite Logo" />
        
        <p>Count: {count}</p>

        <button onClick={() => setCount(count - 1)}>
          Decrease
        </button>
        <button onClick={() => setCount(count + 1)}>
          Increment
        </button>

      </div>
    </>
  )
}

export default App
