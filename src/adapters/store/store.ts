import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			user: userReducer,
		},
	});
};
