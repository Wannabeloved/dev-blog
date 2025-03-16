import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	id: string;
	email: string;
	roleId: number;
	createdAt: string;
}

interface UserState {
	user: User | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: UserState = {
	user: null,
	isLoading: false,
	error: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.error = null;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.user = null;
		},
		clearUser: (state) => {
			state.user = null;
			state.error = null;
		},
	},
});

export const { setUser, setLoading, setError, clearUser } = userSlice.actions;
export default userSlice.reducer;

