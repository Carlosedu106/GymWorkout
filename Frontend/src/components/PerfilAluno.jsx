import React, { useState, useEffect } from "react";
import styles from "./PerfilAluno.module.css";

const PerfilAluno = ({ user }) => {
	useEffect(() => {
		console.log(user);
	});
	return (
		<div className={styles.geral}>
			<h1>{user.name}</h1>
		</div>
	);
};

export default PerfilAluno;
