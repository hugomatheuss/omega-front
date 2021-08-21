import React, { useState } from "react";
import { api } from "../../service/api";
import StoreContext from "../Store/Context";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AiOutlineDollarCircle, AiOutlineCalculator } from "react-icons/ai";
import { BsLightningFill, BsCalendar } from "react-icons/bs";
import { GiPriceTag } from "react-icons/gi";
import { SiGooglemaps } from "react-icons/si";
import Modal from "../Modal/Modal";

import "./CardProposta.css";

const CardProposta = ({ props }) => {
	const { token } = useContext(StoreContext);

	function consumoTotal() {
		const consumoTotal = props.cargas
			.map((c) => c.consumo_kwh)
			.reduce((p, c) => {
				return +p + +c;
			});
		return consumoTotal;
	}

	function handleClick() {
		setOpen(true);
	}

	function excluirProposta() {
		Swal.fire({
			title: "Excluir Proposta",
			text: "Tem certeza que deseja excluir a proposta",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#3485ff",
			cancelButtonColor: "#fa6262",
			confirmButtonText: "Sim, excluir",
		}).then((result) => {
			if (result.isConfirmed) {
				api.delete(`proposta/${props.id_public}`, {
					headers: { Authorization: `Bearer ${token}` },
				})
					.then(() => {
						Swal.fire({
							title: "Sucesso!",
							text: `Proposta Excluida com Sucesso`,
							icon: "success",
							confirmButtonText: "Ok",
						});
					})
					.catch((error) => {
						alert(error.error.response.data.message);
					});
			}
		});
	}

	function contratarProposta() {
		Swal.fire({
			title: "",
			text: "Confirmar contratação",
			icon: "info",
			showCancelButton: true,
			confirmButtonColor: "#3485ff",
			cancelButtonColor: "#fa6262",
			confirmButtonText: "Sim, contratar",
		}).then((result) => {
			if (result.isConfirmed) {
				api.patch(`proposta/${props.id_public}`, {
					headers: { Authorization: `Bearer ${token}` },
				})
					.then(() => {
						Swal.fire({
							title: "Success!",
							text: `Proposta criada com sucesso`,
							icon: "success",
							confirmButtonText: "Ok",
						});
					})
					.catch((error) => {
						alert(error.error.response.data.message);
					});
			}
		});
	}

	const [open, setOpen] = useState(false);

	return (
		<>
			<div className="card--proposta" id="card">
				<h2>{props.contratado ? "Contratado" : "Contrate Agora"}</h2>
				<div className="info">
					<label>
						<div className="item">
							<AiOutlineDollarCircle />
							<p>{props.valor_proposta}</p>
						</div>
					</label>
					<label>
						<div className="item">
							<BsLightningFill />
							<p>{props.fonte_energia}</p>
						</div>
					</label>
					<label>
						<div className="item">
							<SiGooglemaps />
							<p>{props.sub_mercado}</p>
						</div>
					</label>
					<label>
						<div className="item">
							<BsCalendar />
							<p>
								{" "}
								{props.data_inicio} - {props.data_fim}{" "}
							</p>
						</div>
					</label>
					<label>
						<div className="item">
							<AiOutlineCalculator />
							<p>Total {consumoTotal(props.cargas)}KWH</p>
						</div>
					</label>
					{props.desconto && (
						<label>
							<div className="item">
								<GiPriceTag />
								<p>Desconto 5%</p>
							</div>
						</label>
					)}
					{!props.desconto && (
						<label>
							<div className="item">
								<GiPriceTag />
								<p>Valor sem Desconto</p>
							</div>
						</label>
					)}
				</div>

				{props.contratado && (
					<button className="btn detalhes" onClick={handleClick}>
						Detalhes
					</button>
				)}
				{!props.contratado && (
					<div className="buttons">
						<button
							className="btn excluir"
							onClick={excluirProposta}
						>
							Excluir
						</button>
						<button
							className="btn contratar"
							onClick={contratarProposta}
						>
							Contratar
						</button>
					</div>
				)}
			</div>
			<Modal open={open} data={props.cargas} setOpen={setOpen}></Modal>
		</>
	);
};
export default CardProposta;
