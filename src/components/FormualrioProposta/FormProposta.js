import { useContext, useEffect, useState } from "react";
import { api } from "../../service/api";
import { useHistory } from "react-router-dom";
import MultiSelect from "react-multi-select-component";
import Carga from "../Carga/Carga";
import { AiOutlineCalculator } from "react-icons/ai";
import { RiBuilding4Line } from "react-icons/ri";

import StoreContext from "../../components/Store/Context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./FormProposta.css";

function initialState() {
	return {
		data_inicio: "",
		data_fim: "",
		fonte_energia: "",
		sub_mercado: "",
		cargas: [{}],
	};
}

const FormProposta = () => {
	const { token } = useContext(StoreContext);
	const [cargas, setCargas] = useState([]);
	const [values, setValues] = useState(initialState);
	const [dataInicio, setDataInicio] = useState(null);
	const [dataFim, setDataFim] = useState(null);

	useEffect(() => {
		api.get("carga", { headers: { Authorization: `Bearer ${token}` } })
			.then((response) => {
				setCargas(response.data);
			})
			.catch((error) => {
				console.log(error.response.data.message);
			});
	}, []);

	function onSubmit(e) {
		e.preventDefault();
		values.cargas = cargasId;
		console.log(cargas);
		console.log(values);
	}
	function onChange({ target }) {
		const { value, name } = target;
		setValues({
			...values,
			[name]: value,
		});
	}

	const cargasSelecionadas = cargas;
	function selecionarCarga(id_public) {
		const carga = cargas.find((c) => {
			return c.id_public == id_public;
		});

		const exist = cargasSelecionadas.find((c) => {
			return c.id_public == id_public;
		});
		console.log(exist);
		if (!exist) {
			cargasSelecionadas.push(carga);
		} else {
			const index = cargasSelecionadas.findIndex(carga);
			cargasSelecionadas.splice(index, 1);
		}
		// console.log(cargasSelecionadas);
	}
	const [cargasId, setCargasId] = useState([]);
	function handleChange({ target }) {
		if (target.checked) {
			setCargasId([...cargasId, target.value]);
		} else {
			setCargasId(cargasId.filter((carga) => carga !== target.value));
		}
	}
	function handleChecked(id) {
		console.log(cargasId);
		return cargasId.includes(id);
	}
	return (
		<div className="criar-proposta">
			<h2>Valor Da Proposta</h2>
			<form onSubmit={onSubmit} className="form">
				<div className="info-partes">
					<div className="left">
						<label className="fonte-energia">
							Fonte de Energia
							<select
								name="fonte_energia"
								value={values.fonte_energia}
								onChange={onChange}
							>
								<option value="CONVENCIONAL">
									Convencional
								</option>
								<option value="RENOVAVEL">Renovavel</option>
							</select>
						</label>
						<label className="data_inicio">
							Data Inicio
							<DatePicker
								className="dataInicio"
								selected={dataInicio}
								onChange={(date) => setDataInicio(date)}
								dateFormat="dd/MM/yyyy"
								minDate={new Date()}
							/>
						</label>
					</div>
					<div className="right">
						<label className="submercado">
							Submercado
							<select
								name="sub_mercado"
								value={values.sub_mercado}
								onChange={onChange}
							>
								<option value="NORDESTE">Nordeste</option>
								<option value="NORTE">Norte</option>
								<option value="SUL">Sul</option>
								<option value="SUDESTE">Sudeste</option>
							</select>
						</label>
						<label className="data_fim">
							Data Fim
							<DatePicker
								className="dataFim"
								selected={dataFim}
								onChange={(date) => setDataFim(date)}
								dateFormat="dd/MM/yyyy"
								minDate={new Date()}
							/>
						</label>
					</div>
				</div>
				{cargas &&
					cargas.map((carga, index) => {
						return (
							<label key={index + carga.nome_empresa}>
								{carga.nome_empresa}
								<input
									type="checkbox"
									value={carga.id_public}
									checked={handleChecked(carga.id_public)}
									onChange={handleChange}
								></input>
							</label>
						);
					})}
				<button className="btn-cadastro">Enviar</button>
			</form>
		</div>
	);
};

export default FormProposta;
