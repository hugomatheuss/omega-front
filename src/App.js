import Home from "./pages/home/home";

import "./pages/globals.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StoreProvider from "./components/Store/Provider";
import RoutePrivate from "./components/Private/Private";
import Login from "./pages/login/login";
import Cadastro from "./pages/cadastro/cadastro";
import CriarProposta from "./pages/criarProposta/criarProposta";

const App = () => {
	return (
		<div className="App">
			<StoreProvider>
				<BrowserRouter>
					<Switch>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/cadastro">
							<Cadastro />
						</Route>
						<Route path="/create">
							<CriarProposta />
						</Route>
						<Route path="/">
							<Home />
						</Route>
						<Route path="*" element={<div>404 NotFound</div>} />
					</Switch>
				</BrowserRouter>
			</StoreProvider>
		</div>
	);
};

export default App;
