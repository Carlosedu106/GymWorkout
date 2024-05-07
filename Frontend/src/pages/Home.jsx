import { Link } from "react-router-dom";
import styles from "./Home.module.css";
<<<<<<< HEAD


const Home = () => {
    return <h1 className={styles.center}>
        <Link to={"/personal/register"}>
            <button className={styles.button}>Personal</button>
        </Link>
        <Link to={"/aluno/register"}>
            <button className={styles.button}>Aluno</button>
        </Link>
    </h1>;
=======
import Header from "../components/Header";



const Home = () => {
    return(
        <div className={styles.Homepage}>
            <Header/>
        </div>
    )
>>>>>>> 9e7861934b4d88386c4585c4ea372644789e67c5
};

export default Home;