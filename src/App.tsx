import {Route, Routes, useNavigate} from 'react-router-dom';
import { Button, NextUIProvider } from '@nextui-org/react'
import './App.css'
import NavBar from './components/NavBar';

function App() {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Button>Page1</Button>} />
        <Route path="/about" element={<Button>Page2</Button>} />
      </Routes>
    </NextUIProvider>
  )
}

export default App
