import "./Carga.css";
import { useContext, useEffect, useState } from "react";
import StoreContext from "../../components/Store/Context";
import { useHistory } from "react-router-dom";
import { AiOutlineCalculator } from "react-icons/ai";
import { RiBuilding4Line } from "react-icons/ri";

const Carga = ({ props }) => {
	// const { cargas, setCargas } = useContext(StoreContext);
	const [selectCargas, setSelectCargas] = useState([]);
	const [isSelect, setSelect] = useState();
	// function selecionar() {
	// 	if (!isSelect) {
	// 		setSelect(true);
	// 		console.log(cargas);
	// 		console.log(isSelect);
	// 	} else {
	// 		setSelect(false);
	// 		console.log(isSelect);
	// 	}
	// }
	const handleChange = (event) => {
		setSelectCargas({ props });
	};

	return (
		<div className="carga-row">
			<div className="carga">
				<div className="nome">
					<RiBuilding4Line />
					<p> {props.nome_empresa}</p>
				</div>

				<div className="consumo">
					<AiOutlineCalculator />
					<p> {props.consumo_kwh}</p>
				</div>
			</div>
			<button className="btn">x</button>
		</div>

		// {
		// 	label: `${props.nome_empresa}, ${props.consumo_kwh}`,
		// 	value: {
		// 		nome_empresa: props.nome_empre,
		// 		consumo_kwh: props.consumo_kwh,
		// 	},
		// }
	);
};
export default Carga;
