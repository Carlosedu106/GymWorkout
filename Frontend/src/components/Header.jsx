import styles from "./Header.module.css"
import { Link } from "react-router-dom";

export const Header= () => {
    return(
        <div className={styles.Header}>
            <h1>Gym<span className={styles.Workout}>Workout</span></h1>
            <div>
                <Link to={"/signin"}>
                    <button className={styles.button}>Logar</button>
                </Link>
                <Link to={"/aluno/register"}>
                    <button className={styles.button1}>Cadastrar</button>
                </Link>
            </div>
        </div>
    )
}

export default Header