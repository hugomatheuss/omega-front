import React from "react";
import { RiBuilding4Line } from "react-icons/ri";
import { AiOutlineClose, AiOutlineCalculator } from "react-icons/ai";

import "./Modal.css";

function Modal({ children, open, setOpen, data }) {
	if (open)
		return (
			<div className="overlay">
				<div className="card-cargas">
					Cargas
					<AiOutlineClose
						onClick={() => setOpen(false)}
						className="close"
					/>
					<div className="carga-container">
						{data.map((c, key) => (
							<div key={key} className="carga-row">
								<div className="carga">
									<RiBuilding4Line />
									<p> {c.nome_empresa}</p>
								</div>

								<div className="carga">
									<AiOutlineCalculator />
									<p> {c.consumo_kwh}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	else return null;
}

export default Modal;
