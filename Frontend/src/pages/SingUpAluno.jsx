import styles from "./SingUpAluno.module.css";
import axios from "axios";
import React, {useState} from "react";

const SingUpAluno = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.error("As senhas não coincidem");
            return;
        }

        try {
            const response = await axios.post("/aluno/register", {"name":name, "email":email, "password":password, "phone":phone, "dateOfBirth":dateOfBirth, "height":height, "weight":weight});
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
                    <button className={styles.button} onClick={handleSubmit}>Cadastrar</button>
                </form>
            </div>
            <div className={styles.base_text}>
                <p>Já possui uma conta?<span> Faça login</span> </p>
            </div>
        </>
    );
}

export default SingUpAluno;
