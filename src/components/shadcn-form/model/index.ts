import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useActionState } from "react";

const schema = yup.object({
	email: yup
		.string()
		// .email("Неверный email")
		.required("Email обязателен"),
	password: yup
		.string()
		.min(3, "Минимум 3 символа")
		.required("password обязательно"),
	// .matches(
	// 	/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_!?-]{3,}$/,
	// 	"Пароль должен содержать буквы, цифры и может включать символы _ ! ? -",
	// ),
});

export const Model = ({ action, children }) => {
	const form = useForm({
		resolver: yupResolver(schema),
	});
	const [state, formAction] = useActionState(
		(...args) => (console.log("action"), action(...args)),
		undefined,
	);
	return children({ formAction, form, state });
};

