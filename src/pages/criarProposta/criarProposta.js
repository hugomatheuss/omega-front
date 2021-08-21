import Header from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../service/api";
import StoreContext from "../../components/Store/Context";

import "./criarProposta.css";
import FormProposta from "../../components/FormualrioProposta/FormProposta";
const CriarProposta = () => {
	const history = useHistory();
	const { token } = useContext(StoreContext);
	const [cargas, setCargas] = useState([]);
	if (!token) {
		history.push("/login");
	}

	useEffect(() => {
		api.get("carga", { headers: { Authorization: `Bearer ${token}` } })
			.then((response) => {
				setCargas(response.data);
			})
			.catch((error) => {
				console.log(error.response.data.message);
			});
	}, []);

	return (
		<div>
			<Header />
			<div className="body">
				<FormProposta />
			</div>
		</div>
	);
};
export default CriarProposta;
