import './App.css'
import SingUpPersonal from './pages/SingUpPersonal';
import SingUpAluno from './pages/SingUpAluno';
import SignIn from './pages/SignIn';
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage';

function App() {

  

  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/personal/register" element={<SingUpPersonal/>}/>
        <Route path="/aluno/register" element={<SingUpAluno/>}/>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/main" element={<MainPage/>}></Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App
