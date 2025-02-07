
// export type AppDispatch = ReturnType<typeof import("@/di/store/store").makeStore>["dispatch"];
// type storeDispatch = (type: string, payload: any) => void;
// type storeSelect<T> = (selector: (state: any) => T) => T;

// // abstract

// interface IState {
//   [key: string]: any
// }

// interface IStore<T extends IState> {
//   getState: () => T;
//   setState: (state: T) => void;
//   update: (type: string, payload: any) => void;
//   select: <Key extends keyof T>() => T[Key];
// }
// type abstractUseStore = () => {
//   getState: () => T;
//   setState: (state: T) => void;
//   update: (type: string, payload: any) => void;
//   select: (selector: any) => any;
// };
