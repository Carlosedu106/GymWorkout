import { Icon } from "@iconify/react";
import styles from "../components/Sidebar.module.css";

const SideBarPersonal = ({ onItemClick }) => {
	const handleItemClick = (option) => {
		onItemClick(option);
	};
	return (
		<div className={styles.Sidebar}>
			<ul>
				<li onClick={() => handleItemClick("meusTreinos")}>
					<Icon icon="typcn:clipboard" width={25} />
					MEUS TREINOS
				</li>
				<li onClick={() => handleItemClick("treino")}>
					<Icon icon="ic:baseline-add" width={25} />
					ADICIONAR TREINOS
				</li>
			</ul>
		</div>
	);
};

export default SideBarPersonal;
