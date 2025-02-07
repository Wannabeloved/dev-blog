import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/adapters/store/counter.slice";

export const makeStore = () => {
	return configureStore({
		reducer: { counter: counterReducer },
	});
};
