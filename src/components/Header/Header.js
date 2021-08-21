import React from "react";
import "./Header.css";
import Logo from "../../assets/logo.png";
import { HiLogout } from "react-icons/hi";

const Header = () => {
	return (
		<header>
			<div className="header--logo">
				<a href="/">
					<img src={Logo} alt="Omega"></img>
				</a>
			</div>
			<div className="header--itens">
				<a href="/">Minhas Propostas</a>
				<a href="/create">Nova Proposta</a>

				<a
					href="/"
					className="logout"
					onClick={() => {
						localStorage.clear();
					}}
				>
					<HiLogout />
					Logout
				</a>
			</div>
		</header>
	);
};

export default Header;
