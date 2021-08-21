import axios from "axios";

export const api = axios.create({
	// baseURL: "https://app-omega.herokuapp.com/",
	baseURL: "http://localhost:3000/",
});
