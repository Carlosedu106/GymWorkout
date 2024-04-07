import { Link } from "react-router-dom";

const Home = () => {
    return <h1>
        <Link to={"/register"}>
            <button>Cadastro</button>
        </Link>
    </h1>;
};

export default Home;