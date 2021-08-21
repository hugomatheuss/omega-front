import { useContext, useEffect, useState } from "react";
import { api } from "../../service/api";
import { useHistory } from "react-router-dom";
import MultiSelect from "react-multi-select-component";
import { AiOutlineCalculator } from "react-icons/ai";
import { RiBuilding4Line } from "react-icons/ri";
import moment from "moment";
import Swal from "sweetalert2";
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
	const history = useHistory();
	const { token } = useContext(StoreContext);
	const [cargas, setCargas] = useState([]);
	const [valorTotal, setValorTotal] = useState(0);
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

	function cadastrar({
		data_inicio,
		data_fim,
		fonte_energia,
		sub_mercado,
		cargas,
	}) {
		api.post(
			"proposta",
			{
				data_inicio,
				data_fim,
				fonte_energia,
				sub_mercado,
				cargas,
			},
			{ headers: { Authorization: `Bearer ${token}` } },
		)
			.then((response) => {
				history.push("/");
				Swal.fire({
					title: "Success!",
					text: `Proposta criada com sucesso`,
					icon: "success",
					confirmButtonText: "Ok",
				});
			})
			.catch((error) => {
				console.log(error.response.data.message);
				Swal.fire({
					title: "Error!",
					text: `${error.response.data.message}`,
					icon: "error",
					confirmButtonText: "Ok",
				});
			});
	}

	function onSubmit(e) {
		e.preventDefault();
		values.cargas = cargasId;
		values.data_inicio = dataInicio;
		values.data_fim = dataFim;
		console.log(values);
		cadastrar(values);
	}
	function onChange({ target }) {
		const { value, name } = target;
		setValues({
			...values,
			[name]: value,
		});
	}

	function valorProposta(cargas, values, dataInicio, dataFim) {}

	function handleDataInicio(date) {
		setDataInicio(date);
		// if (
		// 	cargasId.length == 0 ||
		// 	values.fonte_energia == "" ||
		// 	values.sub_mercado == "" ||
		// 	dataInicio == null ||
		// 	dataFim == null
		// ) {
		// 	return;
		// } else {
		// 	api.post(
		// 		"proposta/valor",
		// 		values.fonte_energia,
		// 		values.sub_mercado,
		// 		cargasId.length,
		// 		dataInicio,
		// 		dataFim,
		// 	)
		// 		.then((response) => {
		// 			setValorTotal(response.data);
		// 		})
		// 		.catch((error) => {
		// 			console.log(error.response.data.message);
		// 		});
		// }
	}

	function handleDateFim(date) {
		setDataFim(date);
		// if (
		// 	cargasId.length == 0 ||
		// 	values.fonte_energia == "" ||
		// 	values.sub_mercado == "" ||
		// 	dataInicio == null ||
		// 	dataFim == null
		// ) {
		// 	return;
		// } else {
		// 	api.post(
		// 		"proposta/valor",
		// 		values.fonte_energia,
		// 		values.sub_mercado,
		// 		cargasId.length,
		// 		dataInicio,
		// 		dataFim,
		// 	)
		// 		.then((response) => {
		// 			setValorTotal(response.data);
		// 		})
		// 		.catch((error) => {
		// 			console.log(error.response.data.message);
		// 		});
		// }
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
			<h2>Faça seu orçamento</h2>
			<form onSubmit={onSubmit} className="form">
				<div className="info-partes">
					<div className="left">
						<label className="fonte-energia">
							Fonte de Energia
							<select
								className="fonte_energia"
								name="fonte_energia"
								value={values.fonte_energia}
								onChange={onChange}
							>
								<option value=""></option>
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
								onChange={(date) => handleDataInicio(date)}
								dateFormat="dd/MM/yyyy"
								minDate={new Date()}
							/>
						</label>
					</div>
					<div className="right">
						<label className="submercado">
							Submercado
							<select
								className="sub_mercado"
								name="sub_mercado"
								value={values.sub_mercado}
								onChange={onChange}
							>
								<option value=""></option>
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
								onChange={(date) => handleDateFim(date)}
								dateFormat="dd/MM/yyyy"
								minDate={new Date()}
							/>
						</label>
					</div>
				</div>
				{cargas &&
					cargas.map((carga, index) => {
						return (
							<label
								key={index + carga.nome_empresa}
								className="cargas-options"
							>
								{`${carga.nome_empresa} consumo ${carga.consumo_kwh}KWH`}
								<input
									type="checkbox"
									className="cargas-check"
									value={carga.id_public}
									checked={handleChecked(carga.id_public)}
									onChange={handleChange}
								></input>
								<span class="checkmark"></span>
							</label>
						);
					})}
				<button className="btn-cadastro">Enviar</button>
			</form>
		</div>
	);
};

export default FormProposta;
