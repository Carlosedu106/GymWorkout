import styles from "./SingUp.module.css";

const SingUp = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Requisição enviada")
    }
    return (
         <>       
            <div className={styles.form_div}>
                <form className={styles.form_styled}>
                    <label>
                        <p>Nome Usuário:</p>
                        <input type="text" />
                    </label>
                    <label>
                        <p>E-mail:</p>
                        <input type="text" />
                    </label>
                    <label>
                        <p>Telefone:</p>
                        <input type="text" />
                    </label>
                    <label>
                        <p>Senha:</p>
                        <input type="password" />
                    </label>
                    <label>
                        <p>Confirmar senha:</p>
                        <input type="password" />
                    </label>
                    <button className={styles.button} onClick={handleSubmit}>Cadastrar</button>
                </form>
            </div>
            <div className={styles.base_text}>
                <p>Já possui uma conta?<span> Faça login</span> </p>
            </div>
        </>
    )
}

export default SingUp;
