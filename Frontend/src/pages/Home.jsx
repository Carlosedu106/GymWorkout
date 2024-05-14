import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Header from "../components/Header";



const Home = () => {

    return(
        <div className={styles.Homepage}>
            <Header/>
        </div>
    )
};

export default Home;