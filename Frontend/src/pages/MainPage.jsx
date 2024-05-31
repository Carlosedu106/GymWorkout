import SideBarAdm from "../components/SidebarAdm";
import SideBarPersonal from "../components/SidebarPersonal";
import SideBarAluno from "../components/SidebarAluno";
import { useState, useEffect } from 'react'
import axios from 'axios'
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'; // Tema
import 'primereact/resources/primereact.min.css'; // Estilos primários
import styles from './MainPage.module.css'
// import 'primeicons/primeicons.css'; // Ícones
import { useLocation } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';



export const MainPage = () => {
    const [tiposUsuario, setTiposUsuario] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [data, setData] = useState([
    ]);


    function handleClick() {
        axios
            .get("http://demo6113958.mockable.io/alunos")
            .then(response => {
                const alunos = response.data.lista.map(c => {
                    return {
                        id: c.id,
                        cpf: c.cpf,
                        matricula: c.matricula,
                        nome: c.nome,
                        idEndereco: c.idEndereco,
                        curso: c.curso
                    };
                });
                setData(alunos);
            })
            .catch(error => console.log(error));
    }


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
        handleClick();

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


    return (

        <div>
            <div style={{ }}>
                {renderSideBar()}
            </div>

            <div  className={styles.main}>

                <h1>Gerenciamento de Alunos</h1>
                <br></br>

                <DataTable value={data} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} className={styles.table}>
                    <Column className={styles.column} field="id" header="id" headerStyle={{ fontSize: '30px' }}></Column>
                    <Column className={styles.column} field="nome" header="nome" headerStyle={{ fontSize: '30px' }}></Column>
                    <Column className={styles.column} field="cpf" header="cpf" headerStyle={{ fontSize: '30px' }}></Column>
                    <Column className={styles.column} field="matricula" header="matricula" headerStyle={{ fontSize: '30px' }}></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default MainPage;