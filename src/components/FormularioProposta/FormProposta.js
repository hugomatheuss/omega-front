import { useContext, useEffect, useState } from "react";
import { api } from "../../service/api";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import StoreContext from "../../components/Store/Context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./FormProposta.css";
import moment from "moment";

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
		cadastrar(values);
	}
	function onChange({ target }) {
		const { value, name } = target;
		setValues({
			...values,
			[name]: value,
		});
		calcularProposta();
	}

	function calcularProposta() {
		if (
			cargasId.length == 0 ||
			values.fonte_energia == "" ||
			values.sub_mercado == "" ||
			dataInicio == null ||
			dataFim == null
		) {
			return;
		}
		const diff = moment(dataFim).diff(moment(dataInicio));
		const dias = moment.duration(diff).asDays();
		const anos = moment.duration(diff).asYears();
		let submercado_value = 0;
		let fonte_value = 0;
		let valor_total = 0;

		switch (values.sub_mercado) {
			case "NORTE": {
				submercado_value = 2;
				break;
			}
			case "NORDESTE": {
				submercado_value = -1;
				break;
			}
			case "SUL": {
				submercado_value = 3.5;
				break;
			}
			case "SUDESTE": {
				submercado_value = 1.5;
				break;
			}
		}

		fonte_value = values.fonte_energia == "CONVENCIONAL" ? 5 : -2;

		// if (anos >= 3) {
		// 	valor_total =
		// 		(consumo_diario *
		// 			dias *
		// 			(10 + submercado_value + fonte_value)) /
		// 		0.05;
		// } else {
		// 	valor_total =
		// 		consumo_diario * dias * (10 + submercado_value + fonte_value);
		// }
		// setValorTotal(valor_total);
	}

	function handleDataInicio(date) {
		setDataInicio(date);
		calcularProposta();
	}

	function handleDateFim(date) {
		setDataFim(date);
		calcularProposta();
	}

	const [cargasId, setCargasId] = useState([]);
	function handleChange({ target }) {
		if (target.checked) {
			setCargasId([...cargasId, target.value]);
		} else {
			setCargasId(cargasId.filter((carga) => carga !== target.value));
		}
		calcularProposta();
	}

	function handleChecked(id) {
		return cargasId.includes(id);
	}
	return (
		<div className="criar-proposta">
			<h2>Cadastre sua Proposta</h2>
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
