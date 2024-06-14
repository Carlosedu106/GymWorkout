import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import axios from "axios";
import { Button, Autocomplete, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = ({ user, addTraining, exercises, setAlunoId }) => {
	const [exercicioSelecionado, setExercicioSelecionado] = useState({
		exercicioSelecionado: "",
		series: "",
		repeticoes: "",
		id: "",
	});
	const [alunos, setAlunos] = useState([]);

	const getAlunos = async () => {
		try {
			const response = await axios.get(`http://localhost:5000/user/get`);
			console.log("RESPONSE.DATA: ", response.data);
			const alunosTemp = response.data.filter(
				(item) => item.typeUser === "Aluno" && item.personal === user.id
			);
			setAlunos(alunosTemp);
			console.log(alunosTemp);
		} catch (error) {
			console.error("Erro:", error);
		}
	};

	useEffect(() => {
		if (user.typeUser === "Personal") {
			getAlunos();
		}
	}, []);

	const handleClick = () => {
		console.log("Exercício Selecionado:", exercicioSelecionado);
		if (
			exercicioSelecionado.exercicioSelecionado &&
			exercicioSelecionado.series &&
			exercicioSelecionado.repeticoes
		) {
			addTraining(exercicioSelecionado);
			setExercicioSelecionado({
				exercicioSelecionado: "",
				series: "",
				repeticoes: "",
				id: "",
			});
		} else {
			toast.error("Por favor, preencha todos os campos antes de adicionar.");
		}
	};

	return (
		<div className={styles.card}>
			<div className={styles.selectContainer}>
				{user.typeUser === "Personal" ? (
					<Autocomplete
						options={alunos.map((item) => item.name)}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Aluno"
								variant="outlined"
								className={styles.autocompleteInput}
							/>
						)}
						onChange={(event, newValue) => {
							const selectedAlunos = alunos.find(
								(item) => item.name === newValue
							).id;
							setAlunoId(selectedAlunos);
							console.log("onChange - selectedExercise:", newValue);
							console.log(alunos.find((item) => item.name === newValue).name);
						}}
					/>
				) : (
					""
				)}
				<Autocomplete
					options={exercises.map((item) => item.name)}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Exercício"
							variant="outlined"
							className={styles.autocompleteInput}
						/>
					)}
					onChange={(event, newValue) => {
						const selectedExercise = exercises.find(
							(item) => item.name === newValue
						);
						setExercicioSelecionado((prevValues) => ({
							...prevValues,
							exercicioSelecionado: newValue,
							id: selectedExercise ? selectedExercise.id : null,
						}));
						console.log("onChange - selectedExercise:", selectedExercise);
					}}
				/>
				<TextField
					style={{ marginTop: "10px" }}
					label="Séries"
					variant="outlined"
					value={exercicioSelecionado.series}
					onChange={(e) =>
						setExercicioSelecionado((prevValues) => ({
							...prevValues,
							series: e.target.value,
						}))
					}
				/>
				<TextField
					label="Repetições"
					variant="outlined"
					style={{ marginTop: "10px" }}
					value={exercicioSelecionado.repeticoes}
					onChange={(e) =>
						setExercicioSelecionado((prevValues) => ({
							...prevValues,
							repeticoes: e.target.value,
						}))
					}
				/>

				<button className={styles.button} onClick={handleClick}>
					+
				</button>
			</div>
		</div>
	);
};

const ExerciseManager = ({ user }) => {
	const [exercises, setExercises] = useState([]);
	const [exerciseList, setExerciseList] = useState([{}]);
	const [alunoId, setAlunoId] = useState("");

	useEffect(() => {
		const fetchExercise = async () => {
			try {
				const response = await axios.get("http://localhost:5000/exercises/");
				console.log("fetchExercise - response.data:", response.data);
				setExercises(response.data);
			} catch (error) {
				console.error("fetchExercise - error:", error);
			}
		};
		fetchExercise();
	}, []);

	const addTraining = (exercicioAdd) => {
		console.log("Adicionar Treino:", exercicioAdd);
		if (!exercicioAdd) return;

		const { exercicioSelecionado, series, repeticoes } = exercicioAdd;
		const exerciseEnviado = exercises.find(
			(exercise) => exercise.name === exercicioSelecionado
		);
		if (!exerciseEnviado) {
			toast.error("Exercício não encontrado!");
			return;
		}

		axios
			.post("http://localhost:5000/ExerciseUser", {
				alunoId: user.typeUser === "Personal" ? `${alunoId}` : user.id,
				exercicioId: exerciseEnviado.id,
				repeticoes,
				series,
			})
			.then((response) => {
				console.log("addTraining - response.data:", response.data);
				toast.success("Exercício Adicionado");
				setExerciseList((prevList) => [...prevList, {}]); // Adiciona um novo card vazio
			})
			.catch((error) => {
				console.error("addTraining - error:", error);
				if (error.response && error.response.data) {
					toast.error(error.response.data);
				} else {
					toast.error("Erro desconhecido!");
				}
			});
	};

	return (
		<div className={styles.container}>
			{exerciseList.map((_, index) => (
				<Card
					key={index}
					user={user}
					addTraining={addTraining}
					exercises={exercises}
					setAlunoId={setAlunoId}
				/>
			))}
		</div>
	);
};

export default ExerciseManager;
