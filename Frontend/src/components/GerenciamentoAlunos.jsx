import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./GerenciamentoAlunos.module.css";

const GerenciamentoAlunos = ({ user }) => {
	const [alunos, setAlunos] = useState([]);

	// State para controlar o estado de cada switch individualmente
	const [switchStates, setSwitchStates] = useState([]);

	const handleActivateSwitch = (index, alunoId, personalId) => {
		const updatedSwitchStates = [...switchStates];
		updatedSwitchStates[index] = true;
		setSwitchStates(updatedSwitchStates);
		console.log("ativadaAAAAAAAA", index, alunoId, personalId);
		vincularPersonalAluno(alunoId, personalId);
	};

	const handleDeactivateSwitch = (index, alunoId, personalId) => {
		const updatedSwitchStates = [...switchStates];
		updatedSwitchStates[index] = false;
		setSwitchStates(updatedSwitchStates);
		console.log("desativadaAAAAAAAA", index);
		vincularPersonalAluno(alunoId, personalId);
	};
	const getAlunos = async () => {
		try {
			const response = await axios.get(`http://localhost:5000/user/get`);
			console.log("RESPONSE.DATA: ", response.data);
			const alunosTemp = response.data.filter(
				(item) => item.typeUser === "Aluno"
			);

			const initialValues = alunosTemp.map((item) => item.personal === 6);
			// Inicializa o estado dos switches com base na quantidade de alunos
			setSwitchStates(initialValues);
			setAlunos(alunosTemp);
		} catch (error) {
			console.error("Erro:", error);
		}
	};

	const vincularPersonalAluno = async (userId, personalId) => {
		try {
			const response = await axios.post(
				"http://localhost:5000/user/personalaluno",
				{ userId, personalId }
			);
			console.log(response.data);
		} catch (error) {
			console.error("Erro ao vincular personal:", error);
		}
	};

	useEffect(() => {
		getAlunos();
	}, []);

	const handleToggle = (index) => {
		// Cria uma cópia do estado atual dos switches
		const updatedSwitchStates = [...switchStates];
		// Inverte o estado do switch no índice especificado
		updatedSwitchStates[index] = !updatedSwitchStates[index];
		// Atualiza o estado dos switches
		setSwitchStates(updatedSwitchStates);
	};

	return (
		<div className={styles.geral}>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nome</th>
						<th>E-mail</th>
						<th>Opção</th>
					</tr>
				</thead>
				<tbody>
					{alunos.map((item, index) => {
						return (
							<tr key={index}>
								<td>{item.id}</td>
								<td>{item.name}</td>
								<td>{item.email}</td>
								<td>
									<div
										className={styles.switchContainer}
										onClick={() => handleToggle(index)}
									>
										<div
											className={`${styles.switchButton} ${
												switchStates[index] ? styles.on : styles.off
											}`}
											onClick={() => {
												if (!switchStates[index]) {
													handleActivateSwitch(index, item.id, user.id);
												} else {
													handleDeactivateSwitch(index, item.id, null);
												}
											}}
										>
											<div className={styles.switchKnob}></div>
										</div>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default GerenciamentoAlunos;
