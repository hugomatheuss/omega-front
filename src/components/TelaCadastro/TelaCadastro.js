import React, { useState, useContext } from "react";
import { api } from "../../service/api";
import Omega from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "./TelaCadastro.css";

function initialState() {
	return { nome: "", email: "", password: "", confirmPassword: "" };
}

const TelaCadastro = () => {
	const [values, setValues] = useState(initialState);
	const history = useHistory();

	function onChange({ target }) {
		const { value, name } = target;
		setValues({
			...values,
			[name]: value,
		});
	}

	function cadastro({ nome, email, password, confirmPassword }) {
		if (nome !== "" && email !== "" && password !== "") {
			if (password === confirmPassword) {
				api.post("usuario/create", { nome, email, password })
					.then((response) => {
						alert("Usuario Criado com sucesso");
						history.push("/");
					})
					.catch((error) => alert(error.response.data.message));
			} else {
				alert("As senhas não correspondem");
			}
		}
	}

	function onSubmit(event) {
		event.preventDefault();
		cadastro(values);
	}

	return (
		<div className="user-cadastro">
			<div className="logo">
				<img src={Omega} alt="Omega"></img>
			</div>
			<h1 className="user-cadastro__title">Criar Conta</h1>
			<form
				autoComplete="nope"
				className="form-cadastro"
				onSubmit={onSubmit}
			>
				<div className="user-cadastro__form-control">
					<label htmlFor="nome">Nome</label>
					<input
						type="nome"
						required="required"
						name="nome"
						minLength={3}
						placeholder="Digite Seu nome"
						onChange={onChange}
					/>
				</div>
				<div className="user-cadastro__form-control">
					<label htmlFor="email">E-mail</label>
					<input
						type="email"
						required="required"
						class="input-text"
						name="email"
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
						placeholder="your@email.com"
						onChange={onChange}
					/>
				</div>
				<div className="user-cadastro__form-control">
					<label htmlFor="password">Senha</label>
					<input
						id="password"
						type="password"
						name="password"
						required="required"
						minLength={8}
						placeholder="Senha"
						onChange={onChange}
					/>
				</div>

				<div className="user-cadastro__form-control">
					<label htmlFor="password">Confirme sua senha</label>
					<input
						id="password"
						type="password"
						name="confirmPassword"
						required="required"
						minLength={8}
						placeholder="Senha"
						onChange={onChange}
					/>
				</div>
				<button className="btn-cadastro">Cadastrar</button>
			</form>

			<div className="logar">
				{" "}
				<p> Possui uma conta?</p>{" "}
				<Link to="/login">
					{" "}
					<button className="btn-login">Login</button>
				</Link>
			</div>
		</div>
	);
};

export default TelaCadastro;
