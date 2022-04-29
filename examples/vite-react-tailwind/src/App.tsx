import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {useDarkmode} from '../../../packages/react-darkmode-tailwind/src/Index'
function App() {
  const [count, setCount] = useState(0)
  const {theme,setWhite,setDark,setAutomatic} = useDarkmode()
  console.log(theme)
  return (
    <div className="App">
      <h1>useDarkMode</h1>
      <button onClick={setWhite}>Set white</button>
      <button onClick={setDark}>Set dark</button>
      <button onClick={setAutomatic}>Set automatic</button>
    </div>
  )
}

export default App
