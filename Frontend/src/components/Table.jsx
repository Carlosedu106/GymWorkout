import React from 'react';
import styles from '../pages/MainPage.module.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'; // Tema
import 'primereact/resources/primereact.min.css'; // Estilos primários
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';



const Table = ({ data }) => {
    return (
        <div className={styles.main}>
            <h1>Gerenciamento de Alunos</h1>
            <br></br>

            <DataTable value={data} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} className={styles.table}>
                <Column className={styles.column} field="id" header="ID" headerClassName={styles.header}></Column>
                <Column className={styles.column} field="nome" header="Nome" headerClassName={styles.header}></Column>
                <Column className={styles.column} field="cpf" header="CPF" headerClassName={styles.header}></Column>
                <Column className={styles.column} field="matricula" header="Matrícula" headerClassName={styles.header}></Column>
            </DataTable>
        </div>
    )
}

export default Table