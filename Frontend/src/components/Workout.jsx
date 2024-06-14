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
	}, [user]); // Adicionei user como dependência para que o useEffect seja chamado sempre que user mudar

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

	function padWithZeros(number) {
		let numberStr = String(number);
		while (numberStr.length < 4) {
			numberStr = "0" + numberStr;
		}
		return numberStr;
	}

	return (
		<div className={styles.button}>
			<table>
				<thead>
					<tr>
						<th>Número</th>
						<th>Nome</th>
						<th>Repetições</th>
						<th>Séries</th>
						<th>Adicionar</th>
						<th>Remover</th>
					</tr>
				</thead>
				<tbody>
					{data.exercicios.map((item, index) => {
						const newNumber = padWithZeros(item.exercicioId);
						const exercise = exercises.find(
							(option) => option.id === newNumber
						);
						return (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{exercise ? exercise.name : "Carregando..."}</td>
								<td>{item.repeticoes}</td>
								<td>{item.series}</td>
								<td>
									<button
										onClick={() =>
											console.log(exercise ? exercise.name : "Carregando...")
										}
									>
										Adicionar
									</button>
								</td>
								<td>
									<button>Remover</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Workout;
