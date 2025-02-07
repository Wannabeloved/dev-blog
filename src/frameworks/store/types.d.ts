import type { Provider as ReactReduxProvider } from "react-redux";
type Provider = typeof ReactReduxProvider;

export type makeStoreType = typeof import("@/adapters/store/store").makeStore;
export type AppStore = ReturnType<makeStoreType>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

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
