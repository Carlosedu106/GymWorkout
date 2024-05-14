
import SideBarAdm from "../components/SidebarAdm";
import SideBarPersonal from "../components/SidebarPersonal";
import SideBarAluno from "../components/SidebarAluno";
import {useState, useEffect} from  'react'
import axios from 'axios'

export const Dashboard =() => {
    
    const [tiposUsuario, setTiposUsuario] = useState([]);

    useEffect(() => {
      console.log("está sendo chamado");
        const verifyUser = async () => {
          try {
            const response = await axios.get('/tipoUsuario');
            console.log(response.data);
          } catch (error) {
            console.error('Erro:', error);
          }
        };
    
        verifyUser();
      }, []);

    const [pageValue, setPageValue] = useState("") 
    const handlePage = (option) => {
        setPageValue(option);
        console.log(pageValue);
    }

    return(
        <div>
            <SideBarPersonal onItemClick={handlePage} />
        </div>
    );
}

export default Dashboard;