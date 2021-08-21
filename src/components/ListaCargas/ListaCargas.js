import { api } from "../../service/api";
import StoreContext from "../../components/Store/Context";
import { useContext, useEffect, useState } from "react";
import Carga from "../Carga/Carga";
import "./ListaCargas.css";

const ListaCargas = () => {
	// const [cargas, setCargas] = useState([{}]);
	const { token } = useContext(StoreContext);

	return (
		<div className="cargas">
			{/* {console.log(cargas)}
			{cargas.map((c) => (
				<Carga props={c} />
			))} */}
		</div>
	);
};
export default ListaCargas;
