import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router"
import Dashboard from './pages/Dashboard'
import GameDetail from './pages/GameDetail'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/game/:id" element={<GameDetail/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
