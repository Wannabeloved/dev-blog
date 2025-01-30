import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../../features/counter.slice";

export const makeStore = () => {
	return configureStore({
		reducer: { counter: counterReducer },
	});
};

export type makeStoreType = typeof makeStore;
// Infer the type of makeStore
export type AppStore = ReturnType<makeStoreType>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
