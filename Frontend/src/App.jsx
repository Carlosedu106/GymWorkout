import './App.css'
import SingUpPersonal from './pages/SingUpPersonal';
import SingUpAluno from './pages/SingUpAluno';
import SignIn from './pages/SignIn';
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SideBarAdm from './components/SidebarAdm';
import Dashboard from './pages/Dashboard';

function App() {

  

  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/personal/register" element={<SingUpPersonal/>}/>
        <Route path="/aluno/register" element={<SingUpAluno/>}/>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/teste" element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App
