import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Header from "../components/Header";
import image from "../assets/background3.png";



const Home = () => {

    return(
        <div className={styles.Homepage}>
            <Header/>
            <div className={styles.content}>
                <img src={image} alt="HomeBackground" className={styles.responsiveImage}/>
            </div>
        </div>
    )
};

export default Home;