import styles from './Cadastro.module.css';

const Cadastro = () => {
    return (
        <div className={styles.form_container}
        >
            <form className={styles.form_content}>
                <label>
                    <p>Nome</p>
                    <input className={styles.input} type="text" />
                </label>
                <label>
                    <p>Telefone</p>
                    <input className={styles.input} type="text" />
                </label>
                <label>
                    <p>Email</p>
                    <input className={styles.input} type="text" />
                </label>
                <label>
                    <p>Senha</p>
                    <input className={styles.input} type="password" />
                </label>
                <label>
                    <p>Confirmar Senha</p>
                    <input className={styles.input} type="password" />
                </label>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                    }}
                >
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}

export default Cadastro;