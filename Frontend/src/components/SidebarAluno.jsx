import {Icon} from "@iconify/react";
import styles from "../components/Sidebar.module.css";

const SideBarPersonal = ({ onItemClick }) => {
    return (
        <div className={styles.Sidebar}>
            <ul>
                <li onClick={() => onItemClick("aluno")}>
                    <Icon 
                        icon="typcn:clipboard"
                        width={25}
                    /> 
                    MEUS TREINOS
                </li>
                <li onClick={() => onItemClick("treino")}>
                    <Icon
                        icon="ic:baseline-add"
                        width={25}
                    />
                    ADICIONAR TREINOS
                </li>
            </ul>
        </div>
    );
};

export default SideBarPersonal;