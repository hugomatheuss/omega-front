import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import StoreContext from "../../components/Store/Context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./FormProposta.css";

function initialState() {
	return {
		fonte_energia: "",
		sub_mercado: "",
		cargas: [],
	};
}

const FormProposta = () => {
	const [valorAtual, setValorAtual] = useState();
	const [values, setValues] = useState(initialState);
	const [dataInicio, setDataInicio] = useState(null);
	const [dataFim, setDataFim] = useState(null);
	function onSubmit() {}
	function onChange({ target }) {
		const { value, name } = target;
		setValues({
			...values,
			[name]: value,
		});
	}

	return (
		<div className="criar-proposta">
			<h2>Valor Da Proposta</h2>
			<form onSubmit={onSubmit} className="form">
				<div className="left">
					<label className="fonte-energia">
						Fonte de Energia
						<select
							name="fonte_energia"
							value={values.fonte_energia}
							onChange={onChange}
						>
							<option value="CONVENCIONAL">Convencional</option>
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
				<div className="cargas"></div>
			</form>
		</div>
	);
};

export default FormProposta;
