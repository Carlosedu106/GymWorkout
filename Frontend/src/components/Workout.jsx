import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Workout.module.css";

const Workout = ({ user }) => {
	const [data, setData] = useState({
		exercicios: [
			{
				exercicioId: "",
				repeticoes: "",
				series: "",
			},
		],
	});
	const [exercises, setExercises] = useState([]);

	const callApi = async () => {
		try {
			const response = await axios.get(
				`http://localhost:5000/ExerciseUser/all/${user.id}`
			);
			console.log("RESPONSE.DATA: ", response.data);
			setData({ exercicios: response.data.exercicios });
		} catch (error) {
			console.error("Erro:", error);
		}
	};

	useEffect(() => {
		callApi();
	}, []);

	useEffect(() => {
		const fetchExercises = async () => {
			try {
				const response = await axios.get("http://localhost:5000/exercises/");
				console.log("fetchExercise - response.data:", response.data);
				setExercises(response.data);
			} catch (error) {
				console.error("fetchExercise - error:", error);
			}
		};
		fetchExercises();
	}, []);

	return (
		<div className={styles.button}>
			<table>
				<thead>
					<tr>
						<th>Número</th>
						<th>Nome</th>
						<th>Repetições</th>
						<th>Séries</th>
					</tr>
				</thead>
				<tbody>
					{data.exercicios.map((item, index) => {
						const exercise = exercises.find(
							(option) => option.id === item.exercicioId
						);
						return (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{exercise ? exercise.name : "Não encontrado"}</td>
								<td>{item.repeticoes}</td>
								<td>{item.series}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<button
				className={styles.button}
				onClick={() =>
					console.log(exercises.find((option) => option.id === "1512")?.name)
				}
			>
				teste
			</button>
		</div>
	);
};

export default Workout;
