import React, {useState} from "react";
import styles from "./SignIn.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"
import {Icon} from "@iconify/react"

export const SingIn=() => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate("");

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password.length < 8) {
            toast.warn("A senha deve ter pelo menos 8 caracteres.");
            return;
        }
        
        try {
            const response = await axios.post("/user/login", {"email": email, "password": password});
            if (response.data != "error") {
                const tiposUsuario = (response.data.typeUser)
                toast.success("Login Realizado com Sucesso!");
                navigate("/main", { state: {usuario:tiposUsuario} })
            }
        } catch (error) {
            if(error.response.status === 403){
                toast.error("O e-mail ou senha incorretos.");
            }    
           console.log(error)
        }
    }

    
    return(
            <div className={styles.form_div}>
                <ToastContainer />
                <div className={styles.base_text}>
                <form onSubmit={handleSubmit} className={styles.form_styled}>
                    <label>
                        <p>Email:</p>
                        <input type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Senha:</p>
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                  </label>
                  <button  type="submit" className={styles.button} >Login</button>
                </form>
                    <p>Esqueceu a senha?</p>
                    <p>Não possui conta?&nbsp; 
                        <Link to={"/aluno/register"}>
                            Cadastrar
                        </Link></p>
                </div>
        </div>
    )

}

export default SingIn