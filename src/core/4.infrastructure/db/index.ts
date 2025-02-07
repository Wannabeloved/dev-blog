import type { IDB, IUsersDB } from "./types";

const DB: IDB = {
	get: async (path: string) => {
		const res = await fetch(`http://localhost:3005/${path}`);
		return res;
	},
	set: async (path: string, body: any, options) => {
		const res = await fetch(`http://localhost:3005/${path}`, {
			method: "POST",
			body: body,
			...options,
		});
		return res;
	},
	remove: async (path: string) => {
		const res = await fetch(`http://localhost:3005/${path}`, {
			method: "DELETE",
		});
		return res;
	},
};

export const UsersDB: IUsersDB = {
	getUsers: async () => {
		return await DB.get("users").then((res) => res.json());
	},
	getUser: async (id: string) => {
		return await DB.get(`user-${id}`);
	},
	createUser: async (user: any) => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify(user);
		return await DB.set(`users`, raw, { headers: myHeaders });
	},
	updateUser: async (id: string, user: any) => {
		return await DB.set(`user-${id}`, user);
	},
	deleteUser: async (id: string) => {
		return await DB.remove(`user-${id}`);
	},
};
