type authorize = (login: string, password: string) => Promise<response>;
type checkLogin = (login: string) => boolean;
type checkPassword = (password: string) => boolean;
type response = {
	error: null | Error;
	res: {
		removeComment: () => void;
		logOut: () => void;
	};
};

type register = (login: string, password: string) => Promise<response>;
type checkPasswordCorrect = (password: string) => boolean;
type checkLoginAvailability = (login: string) => boolean;
