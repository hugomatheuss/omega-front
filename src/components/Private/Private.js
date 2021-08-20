import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import StoreContext from "../Store/Context";

const RoutePrivate = ({ component: Component, ...res }) => {
	const { token } = useContext(StoreContext);
	return (
		<Route
			{...res}
			render={() =>
				token ? <Redirect to="/" /> : <Redirect to="/login" />
			}
		/>
	);
};

export default RoutePrivate;
