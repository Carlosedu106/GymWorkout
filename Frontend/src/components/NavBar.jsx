import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const NavBar = () => {
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const logout = () => {
		setUser("");

		navigate("/signin");
	};
	return (
		<div className={styles.NavBar}>
			<div className={styles.logout} onClick={() => logout()}>
				<Icon icon="material-symbols:logout" width={25} />
				Logout
			</div>
		</div>
	);
};
