"use client";

import type { AuthAction } from "./types";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { AppleSvg } from "./ui/apple-svg";
import { GoogleSvg } from "./ui/google-svg";
import { OauthLoginButton } from "./ui/oauth-login-button";
import { Br } from "./ui/br";
import { Form } from "../shared/Form";

import { Model } from "./model";
import Link from "next/link";

export function LoginForm({
	action,
	className,
	...props
}: { action: AuthAction } & React.ComponentProps<"div">) {
	return (
		<Model action={action}>
			{({ formAction, form, state }) => (
				<div className={cn("flex flex-col gap-6", className)} {...props}>
					<Card>
						<CardHeader className="text-center">
							<CardTitle className="text-xl">Welcome back</CardTitle>
							<CardDescription>
								Login with your Apple or Google account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Form form={form} action={formAction}>
								<div className="grid gap-6">
									<div className="flex flex-col gap-4">
										<OauthLoginButton>
											<AppleSvg />
											Login with Apple
										</OauthLoginButton>
										<OauthLoginButton>
											<GoogleSvg />
											Login with Google
										</OauthLoginButton>
									</div>
									<Br> Or continue with </Br>
									<div className="grid gap-6">
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem className="grid gap-3">
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input
															// id="email"
															// type="email"
															placeholder="m@example.com"
															// required
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="password"
											render={({ field }) => (
												<FormItem className="grid gap-3">
													<div className="flex items-center">
														<FormLabel htmlFor="password">Password</FormLabel>
														<a
															href="#"
															className="ml-auto text-sm underline-offset-4 hover:underline"
														>
															Forgot your password?
														</a>
													</div>
													<FormControl>
														<Input
															// id="password"
															// type="password"
															// required
															type="password"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<Button type="submit" className="w-full">
											Login
										</Button>
									</div>
									<div className="text-center text-sm">
										Don&apos;t have an account?{" "}
										<Link href="#" className="underline underline-offset-4">
											Sign up
										</Link>
									</div>
								</div>
								{state && <p>{state}</p>}
							</Form>
						</CardContent>
					</Card>
				</div>
			)}
		</Model>
	);
}

