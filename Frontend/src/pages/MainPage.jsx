import SideBarAdm from "../components/SidebarAdm";
import SideBarPersonal from "../components/SidebarPersonal";
import SideBarAluno from "../components/SidebarAluno";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"; // Tema
import "primereact/resources/primereact.min.css"; // Estilos primários
import styles from "./MainPage.module.css";
import { useLocation } from "react-router-dom";
import Table from "../components/Table";
import Workout from "../components/Workout";
import Card from "../components/Card";
import { UserContext } from "../contexts/UserContext";
import { NavBar } from "../components/NavBar";

export const MainPage = () => {
	const [tiposUsuario, setTiposUsuario] = useState([]);
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const [data, setData] = useState([]);
	const [sidebarOption, setSidebarOption] = useState("");
	const { user } = useContext(UserContext);

	function handleClick() {
		axios
			.get("http://demo6113958.mockable.io/alunos")
			.then((response) => {
				const alunos = response.data.lista.map((c) => {
					return {
						id: c.id,
						cpf: c.cpf,
						matricula: c.matricula,
						nome: c.nome,
						idEndereco: c.idEndereco,
						curso: c.curso,
					};
				});
				setData(alunos);
			})
			.catch((error) => console.log(error));
	}

	useEffect(() => {
		console.log(user, "TA AQUUIIIIIII");
		const verifyUser = async () => {
			try {
				const response = await axios.get("/tipoUsuario");
				setTiposUsuario(location.state?.usuario);
				console.log(user);
				setLoading(false);
			} catch (error) {
				console.error("Erro:", error);
				setLoading(false);
			}
		};
		handleClick();

		verifyUser();
	}, []);

	const getOptionSidebar = (option) => {
		setSidebarOption(option);
	};

	const renderSideBar = () => {
		if (loading) {
			return <div>Loading...</div>;
		} else {
			switch (user.typeUser) {
				case "Administrador":
					return <SideBarAdm onItemClick={getOptionSidebar} />;
				case "Personal":
					return <SideBarPersonal onItemClick={getOptionSidebar} />;
				case "Aluno":
					return <SideBarAluno onItemClick={getOptionSidebar} />;
				default:
					return <div>Tipo de usuário desconhecido.</div>;
			}
		}
	};

	return (
		<div>
			<NavBar />
			<div className={styles}>{renderSideBar()} </div>
			<div>
				{sidebarOption === "aluno" ? <Table data={data} /> : ""}
				{sidebarOption === "treino" ? (
					<div className={styles.cardsConteiner}>
						<Card user={user} />
					</div>
				) : (
					""
				)}
				<Workout user={user} />
			</div>
			<div></div>
		</div>
	);
};

export default MainPage;
