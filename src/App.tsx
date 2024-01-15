import {Route, Routes, useNavigate} from 'react-router-dom';
import { Button, NextUIProvider } from '@nextui-org/react'
import './App.css'
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </NextUIProvider>
  )
}

export default App
