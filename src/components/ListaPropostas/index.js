import "./ListaPropostas.css";
import { useEffect, useState } from "react";
import CardProposta from "../CardProposta";
import StoreContext from "../Store/Context";
import { useContext } from "react";
import { api } from "../../service/api";
import NoProposta from "../NoProposta/NoProposta";

const ListaPropostas = () => {
	const [propostas, setPropostas] = useState(null);
	const { token } = useContext(StoreContext);

	useEffect(() => {
		api.get("proposta/", {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => {
				setPropostas(response.data);
			})
			.catch((error) => {
				console.log(error.response.data.message);
			});
	});

	return (
		<div className="propostas">
			{propostas && propostas.map((p) => <CardProposta props={p} />)}
			{!propostas && <NoProposta />}
		</div>
	);
};

export default ListaPropostas;
