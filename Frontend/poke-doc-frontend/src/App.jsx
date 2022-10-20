import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Toolbar from './components/Navbar/Toolbar'



function App() {
  const [count, setCount] = useState(0)

  return (
    <Toolbar  links={["Hello","World","Name"]}/>
  )
}

export default App
