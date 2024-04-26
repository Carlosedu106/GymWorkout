import { Link } from "react-router-dom";
import styles from "./Home.module.css";


const Home = () => {
    return <h1 className={styles.center}>
        <Link to={"/personal/register"}>
            <button className={styles.button}>Personal</button>
        </Link>
        <Link to={"/aluno/register"}>
            <button className={styles.button}>Aluno</button>
        </Link>
        <Link to={"/login"}>
            <button className={styles.button}>Login</button>
        </Link>
    </h1>;
};

export default Home;