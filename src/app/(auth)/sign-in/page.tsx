import { LoginForm } from "@/components/shadcn-form/login-form";
import { authenticateAction } from "../actions";

export default function Page() {
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
		// 	<h1>Sign In</h1>
		// 	<LoginForm width="600px" action={authenticateAction}></LoginForm>
		// </section>
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<a href="#" className="flex items-center gap-2 self-center font-medium">
					Sign In.
				</a>
				<LoginForm action={authenticateAction} />
			</div>
		</div>
	);
}
