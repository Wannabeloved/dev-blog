// type User = {};

// export declare type doGetUserFromDB = (userEmail) => Awaitable<User>;
// export declare type doSaveUserInDB = (user: User) => Error | void;

import { AuthProvidersEnum } from "@/domain/entities/auth";

export type doGetUserEmailFromOAuth = (provider: string) => string;
export type doGetUserFromDB = (email: string) => Data | null;
export type doSaveUserInDB = (user: Data) => Error | void;
export type doComparePasswords = (
	receivedPassword: string,
	userPassword: string,
) => boolean;
export type doCheckIsMyError = (err: unknown) => err is Error;

export declare class UnexistedUser {
	constructor(knownData: { email: string });
}
export declare class IncorrectPassword {
	constructor(knownData: { email: string });
}

export declare interface Props {
	provider: AuthProvidersEnum;
	data: Data;
}
export declare type Data = { email: string; password: string };
