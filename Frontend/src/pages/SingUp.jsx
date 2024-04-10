import styles from "./SingUp.module.css";
import axios from "axios";
import React, {useState} from "react";

const SingUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.error("As senhas não coincidem");
            return;
        }

        try {
            const response = await axios.post("/personal/register", {"name":name, "email":email, "password":password, "phone":phone});
            console.log("Requisição enviada")
            console.log(response.data)
        } catch (error) {
            console.error("Erro ao enviar formulário", error);
        }
    
    };

 return (
         <>       
            <div className={styles.form_div}>
                <form className={styles.form_styled}>
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
                    <button className={styles.button} onClick={handleSubmit}>Cadastrar</button>
                </form>
            </div>
            <div className={styles.base_text}>
                <p>Já possui uma conta?<span> Faça login</span> </p>
            </div>
        </>
    );
}

export default SingUp;
