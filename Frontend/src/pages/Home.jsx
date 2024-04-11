import { Link } from "react-router-dom";

const Home = () => {
    return <h1>
        <Link to={"/personal/register"}>
            <button>Personal</button>
        </Link>
        <Link to={"/aluno/register"}>
            <button>Aluno</button>
        </Link>
    </h1>;
};

export default Home;