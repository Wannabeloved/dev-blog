"use client";
import { StoreProvider as Signature } from "./types";

import { Provider } from "react-redux";
import { makeStore } from "./store";

import { createStoreProvider } from "./createStoreProvider";

export { makeStore } from "./store";

export const StoreProvider: Signature = createStoreProvider({
	Provider,
	makeStore,
});
