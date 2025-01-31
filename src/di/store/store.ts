import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../../features/counter.slice";

export const makeStore = () => {
	return configureStore({
		reducer: { counter: counterReducer },
	});
};
