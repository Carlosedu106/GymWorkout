import './App.css'
import SingUpPersonal from './pages/SingUpPersonal';
import SingUpAluno from './pages/SingUpAluno';
import LoginPage from './pages/LoginPage'
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  

  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/personal/register" element={<SingUpPersonal/>}/>
        <Route path="/aluno/register" element={<SingUpAluno/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App
