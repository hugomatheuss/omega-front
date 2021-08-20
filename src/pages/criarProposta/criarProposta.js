import Header from "../../components/Header";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import StoreContext from "../../components/Store/Context";

import "./criarProposta.css";
import FormProposta from "../../components/FormualrioProposta/FormProposta";
const CriarProposta = () => {
	const history = useHistory();
	const { token } = useContext(StoreContext);
	if (!token) {
		history.push("/login");
	}

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
