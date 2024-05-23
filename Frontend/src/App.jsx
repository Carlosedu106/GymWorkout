import './App.css'
import SingUpPersonal from './pages/SingUpPersonal';
import SingUpAluno from './pages/SingUpAluno';
import SignIn from './pages/SignIn';
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
// import SideBarAdm from './components/SidebarAdm';
import Dashboard from './pages/Dashboard';
=======
import MainPage from './pages/MainPage';
>>>>>>> 7f144ad19f87f52eb8f8fb336d36c2eb61f43f4b

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
