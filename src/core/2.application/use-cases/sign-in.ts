import { AuthProvidersEnum } from "@/domain/entities/auth";

import { doComparePasswords } from "../utils/do-compare-passwords";

declare function doGetUserEmailFromOAuth(provider: string): string;
declare function doGetUserFromDB(email: string): Data | null;
declare class UnexistedUser {
	constructor(knownData: { email: string });
}
declare class IncorrectPassword {
	constructor(knownData: { email: string });
}

declare interface Props {
	provider: AuthProvidersEnum;
	data: Data;
}
declare type Data = { email: string; password: string };
declare function doCheckIsMyError(err: unknown): err is Error;

const providersAuthFunctions: Record<
	AuthProvidersEnum,
	(props: Props) => Promise<Data>
> = {
	credentials: authorizeWithCredentials,
	github: authorizeWithOAuth,
	telegram: (props: Props) => new Promise(() => {}),
};

async function signIn(provider: AuthProvidersEnum, data: Data) {
	try {
		const user = await providersAuthFunctions[provider]({ provider, data });

		return user;
	} catch (err) {
		if (!doCheckIsMyError(err)) throw err;

		switch (err.constructor) {
			case UnexistedUser:
				return;
			case IncorrectPassword:
				return;
		}
	}
}

async function authorizeWithCredentials({ data }: { data: Data }) {
	let { email, password: receivedPassword } = data;

	const user = await doGetUserFromDB(email);
	if (!user) throw new UnexistedUser({ email });

	const isPasswordCorrect = doComparePasswords(receivedPassword, user.password);

	if (!isPasswordCorrect) throw new IncorrectPassword({ email });

	return user;
}
async function authorizeWithOAuth({
	provider,
}: {
	provider: AuthProvidersEnum;
}) {
	const email = doGetUserEmailFromOAuth(provider);

	const user = doGetUserFromDB(email);
	if (!user) throw new UnexistedUser({ email });

	return user;
}
