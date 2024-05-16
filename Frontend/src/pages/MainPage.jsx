import SideBarAdm from "../components/SidebarAdm";
import SideBarPersonal from "../components/SidebarPersonal";
import SideBarAluno from "../components/SidebarAluno";
import {useState, useEffect} from  'react'
import axios from 'axios'
import { useLocation } from "react-router-dom";

export const MainPage = () => {
    const [tiposUsuario, setTiposUsuario] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();


    useEffect(() => {
      console.log("está sendo chamado");
        const verifyUser = async () => {
          try {
                const response = await axios.get('/tipoUsuario'); 
                setTiposUsuario(location.state?.usuario); 
                console.log(tiposUsuario)
                setLoading(false);
            } catch (error) {
                console.error('Erro:', error);
                setLoading(false);
            }
        };
    
        verifyUser();
      }, []);

      const renderSideBar = () => {
        if (loading) {
            return <div>Loading...</div>; 
        } else {
            switch (tiposUsuario) {
                case 'Administrador':
                    return <SideBarAdm />;
                case 'Personal':
                    return <SideBarPersonal />;
                case 'Aluno':
                    return <SideBarAluno />;
                default:
                    return <div>Tipo de usuário desconhecido.</div>; 
            }
        }
    };

    
    return(
        <div>
            {renderSideBar()}
        </div>
    );
}

export default MainPage;