import {Icon} from "@iconify/react";
import styles from "../components/Sidebar.module.css";


const SideBarAdm = ({ onItemClick }) => {

    const handleItemClick = (option) => {
        onItemClick(option);
    }
    return (
        <div className={styles.Sidebar}>
            <ul>
                <li onClick={() => handleItemClick("aluno")}>
                    <Icon 
                        icon="ph:student-fill"
                        width={25}
                    /> 
                    ALUNOS
                </li>
                <li onClick={() => handleItemClick("treino")}>
                    <Icon
                        icon="mdi:dumbbell"
                        width={25}
                    />
                    TREINOS
                </li>
                <li onClick={() => handleItemClick("personal")}>
                    <Icon
                        icon="material-symbols:person"
                        width={25}
                    />
                    PERSONAL
                </li>
            </ul>
        </div>
    );
};

export default SideBarAdm;