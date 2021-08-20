import Header from "../../components/Header";
import ListaPropostas from "../../components/ListaPropostas";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import StoreContext from "../../components/Store/Context";

import "./home.css";
const Home = () => {
	const history = useHistory();
	const { token } = useContext(StoreContext);
	if (!token) {
		history.push("/login");
	}

	return (
		<div>
			<Header />
			<div className="body">
				<ListaPropostas />
			</div>
		</div>
	);
};
export default Home;
