import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useActionState } from "react";
import { UseFormReturn } from "react-hook-form";
import { AuthAction } from "../types";
import React from "react";

const schema = yup.object({
	email: yup
		.string()
		.email("Неверный формат email")
		.required("Email обязателен"),
	password: yup
		.string()
		.min(7, "Пароль должен содержать минимум 7 символов")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{7,}$/,
			"Пароль должен содержать хотя бы одну строчную букву, одну заглавную букву, одну цифру и один спец-символ",
		)
		.required("Пароль обязателен"),
	// .matches(
	// 	/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_!?-]{3,}$/,
	// 	"Пароль должен содержать буквы, цифры и может включать символы _ ! ? -",
	// ),
});

type FormValues = {
	email: string;
	password: string;
};

type ModelProps = {
	action: AuthAction;
	children: (props: {
		formAction: (formData: FormData) => void;
		form: UseFormReturn<FormValues>;
		state: string | undefined;
	}) => React.ReactNode;
};

export const Model = ({ action, children }: ModelProps) => {
	const form = useForm<FormValues>({
		resolver: yupResolver(schema),
	});

	const [state, formAction] = useActionState(action, undefined);

	return children({ formAction, form, state });
};

