import './App.css'
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
}

export default App
