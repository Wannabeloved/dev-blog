import type { Provider as ReactReduxProvider } from "react-redux";
type Provider = typeof ReactReduxProvider;

import type { makeStoreType } from "./store";
export type { AppStore, RootState, AppDispatch } from "./store";

export type StoreProvider = (props: {
	children: React.ReactNode;
}) => JSX.Element;

interface createStoreProviderProps {
	makeStore: makeStoreType;
	Provider: Provider;
}

export type createStoreProvider = (
	props: createStoreProviderProps,
) => StoreProvider;
