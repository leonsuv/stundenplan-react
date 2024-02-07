import { Route, Routes, useNavigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react'
import './App.css'
import Home from './pages/Home';
import About from './pages/About';
import { AppContextProvider } from './context/AppContext';
import PrivateRoute from './components/PrivateRoute';
import { Login } from './pages/Login';

function App() {
  const navigate = useNavigate();
  
  return (
    <NextUIProvider navigate={navigate}>
      <AppContextProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
      </AppContextProvider>
    </NextUIProvider>
  )
}

export default App
