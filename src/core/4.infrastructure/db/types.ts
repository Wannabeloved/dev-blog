export interface IDB {
	get: (key: string) => Promise<Response>;
	set: (key: string, value: any, options?: Object) => Promise<Response>;
	remove: (key: string) => Promise<Response>;
}
export interface IUsersDB {
	getUsers: () => Promise<any>;
	getUser: (id: string) => Promise<any>;
	createUser: (user: any) => Promise<any>;
	updateUser: (id: string, user: any) => Promise<any>;
	deleteUser: (id: string) => Promise<any>;
}
