import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/shadcn-form/login-form";
import { signIn } from "@/core/2.application/use-cases/mongo/sign-in";
import { redirect } from "next/navigation";

export default async function LoginPage() {
	async function action(_: any, formData: FormData) {
		"use server";
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const res = await signIn({ email, password });
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
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<a href="#" className="flex items-center gap-2 self-center font-medium">
					<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
						<GalleryVerticalEnd className="size-4" />
					</div>
					Acme Inc.
				</a>
				<LoginForm action={action} />
			</div>
		</div>
	);
}

