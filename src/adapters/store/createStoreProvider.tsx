"use client";
import { useRef } from "react";
import type {
	createStoreProvider as Signature,
	AppStore,
} from "../../frameworks/store/types";

export const createStoreProvider: Signature = ({ makeStore, Provider }) => {
	return ({ children }: { children: React.ReactNode }) => {
		const storeRef = useRef<AppStore | null>(null);

		if (!storeRef.current) {
			storeRef.current = makeStore();
		}
		return <Provider store={storeRef.current}>{children}</Provider>;
	};
};
