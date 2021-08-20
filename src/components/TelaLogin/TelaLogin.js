import React, { useState, useContext } from "react";
import { api } from "../../service/api";
import { useHistory } from "react-router-dom";
import StoreContext from "../Store/Context";
import Omega from "../../assets/logo.png";
import { Link } from "react-router-dom";

import "./TelaLogin.css";

function initialState() {
	return { username: "", password: "" };
}

const TelaLogin = () => {
	const [values, setValues] = useState(initialState);
	const { setToken } = useContext(StoreContext);
	const history = useHistory();
	function onChange({ target }) {
		const { value, name } = target;
		setValues({
			...values,
			[name]: value,
		});
	}
	function login({ username, password }) {
		if (username !== "" && password !== "") {
			api.post("usuario/login", { username, password })
				.then((response) => {
					setToken(response.data.access_token);
					history.push("/");
				})
				.catch((error) => alert(error.response.data.message));
		}
	}
	function onSubmit(event) {
		event.preventDefault();
		login(values);
	}
	return (
		<div className="user-login">
			<div className="logo">
				<img src={Omega} alt="Omega"></img>
			</div>
			<h1 className="user-login__title">Acessar o Sistema</h1>
			<form
				autoComplete="nope"
				className="form-login"
				onSubmit={onSubmit}
			>
				<div className="user-login__form-control">
					<label htmlFor="username">E-mail</label>
					<input
						type="email"
						required="required"
						className="input-text"
						name="username"
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
						placeholder="your@email.com"
						onChange={onChange}
						defaultValue={values.username}
					/>
				</div>
				<div className="user-login__form-control">
					<label htmlFor="password">Senha</label>
					<input
						id="password"
						required="required"
						type="password"
						name="password"
						minLength={8}
						placeholder="Senha"
						onChange={onChange}
						defaultValue={values.password}
					/>
				</div>
				<button className="btn-login">Entrar</button>
			</form>

			<div className="cadastrar">
				{" "}
				<p>Não tem uma conta?</p>{" "}
				<Link to="/cadastro">
					{" "}
					<button className="btn-cadastro">Criar Conta</button>
				</Link>
			</div>
		</div>
	);
};

export default TelaLogin;
