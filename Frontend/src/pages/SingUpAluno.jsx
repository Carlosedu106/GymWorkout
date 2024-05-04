import styles from "./SingUpAluno.module.css";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"


const SingUpAluno = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleLogin = () => {
        navigate ("/signin")
    } 
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateEmail(email)) {
            toast.warn("Por favor, insira um email válido.");
            return;
        }
        if (password.length < 8) {
            toast.warn("A senha deve ter pelo menos 8 caracteres.");
            return;
        }
        if (password !== confirmPassword) {
            toast.warn("As senhas digitadas devem ser iguais nos 2 campos.");
            return;
        }

        try {
            const response = await axios.post("/aluno/register", { "name": name, "email": email, "password": password, "phone": phone, "dateOfBirth": dateOfBirth, "height": height, "weight": weight });
            if (response.data != "error") {
                toast.success("Cadastro Realizado com Sucesso!");
            }
        } catch (error) {
            if(error.response.status === 400){
            toast.error("O e-mail já está sendo utilizado.");
        } else {
            toast.error("Erro ao enviar formulário. Por favor, tente novamente mais tarde.");
        }
            console.log("Erro capturado:", error);

        }

    };

    return (
        <>
            <div className={styles.form_div}>
                <ToastContainer />
                <Link to={"/personal/register"}>
                    <button className={`${styles.button} ${styles.button_personal} `}> Sou personal
                    </button>
                </Link>
                <form onSubmit={handleSubmit} className={styles.form_styled}>
                    <label>
                        <p>Nome Usuário:</p>
                        <input type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>E-mail:</p>
                        <input type="text"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Telefone:</p>
                        <input type="text"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Data de nascimento:</p>
                        <input type="text"
                            onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Altura:</p>
                        <input type="text"
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Peso:</p>
                        <input type="text"
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Senha:</p>
                        <input type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Confirmar senha:</p>
                        <input type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit" className={styles.button} >Cadastrar</button>
                </form>

            </div>
            <div className={styles.base_text}>
                <p>Já possui uma conta?<span onClick={handleLogin}> Faça login</span> </p>
            </div>
        </>
    );
}

export default SingUpAluno;
