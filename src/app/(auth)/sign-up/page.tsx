import { LoginForm } from "@/components/shadcn-form/login-form";
// import { registerAction } from "../actions";
import { redirect } from "next/navigation";
import { signUp } from "@/core/2.application/use-cases/mongo/sign-up";

export default function Page() {
	async function action(_: any, formData: FormData) {
		"use server";
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const confirmPassword = password; // В идеале здесь должна быть проверка подтверждения пароля
		const res = await signUp({ email, password, confirmPassword });
		if (res.ok) {
			redirect("/");
		} else {
			return res.message as
				| "Invalid credentials."
				| "Something went wrong."
				| undefined;
		}
	}
	return (
		// <section
		// 	style={{
		// 		display: "flex",
		// 		flexDirection: "column",
		// 		justifyContent: "center",
		// 		alignItems: "center",
		// 		width: "100%",
		// 		height: "100%",
		// 	}}
		// >

		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<a href="#" className="flex items-center gap-2 self-center font-medium">
					Sign Up.
				</a>
				<LoginForm action={action} />
			</div>
		</div>
		// </section>
	);
}

