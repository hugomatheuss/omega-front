import { createContext } from "react";

const StoreContext = createContext({
	token: null,
	setToken: () => {},
	cargas: [],
	setCargas: () => {},
});

export default StoreContext;
