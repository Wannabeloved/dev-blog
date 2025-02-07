import LoginForm from "@/components/auth-form";
import { registerAction } from "../actions";

export default function Page() {
	return (
		<section
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "100%",
			}}
		>
			<h1>Sign Up</h1>
			<LoginForm width="600px" action={registerAction}></LoginForm>
		</section>
	);
}
