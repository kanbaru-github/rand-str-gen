import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../scss/App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className='default'>
        <div className='default__logo-wrap'>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="default__logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="default__logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="default__card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
        <p className="default__read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </section>
    </>
  )
}

export default App
