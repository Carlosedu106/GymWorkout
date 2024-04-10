import './App.css'
<<<<<<< HEAD
import Cadastro from './pages/cadastro/Cadastro'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/cadastro" element = {<Cadastro/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
=======
import SingUp from "./pages/SingUp";
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  

  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<SingUp/>}/>
      </Routes>
    </BrowserRouter>
  </>
  );
>>>>>>> 41c900c353ee6437314a07e0f956d689500e99ca
}

export default App
