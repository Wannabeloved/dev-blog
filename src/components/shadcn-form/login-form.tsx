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
import { UseFormReturn } from "react-hook-form";
import React from "react";

import { TelegramSvg } from "./ui/telegram-svg";
import { GitHubSvg } from "./ui/github-svg";
import { OauthLoginButton } from "./ui/oauth-login-button";
import { Br } from "./ui/br";
import { Form } from "../shared/Form";

import { Model } from "./model";
import Link from "next/link";

type FormValues = {
	email: string;
	password: string;
};

export function LoginForm({
	action,
	className,
	...props
}: { action: AuthAction } & React.ComponentProps<"div">) {
	return (
		<Model action={action}>
			{({
				formAction,
				form,
				state,
			}: {
				formAction: (formData: FormData) => void;
				form: UseFormReturn<FormValues>;
				state: string | undefined;
			}) => (
				<div className={cn("flex flex-col gap-6", className)} {...props}>
					<Card>
						<CardHeader className="text-center">
							<CardTitle className="text-xl">Welcome back</CardTitle>
							<CardDescription>
								Login with your Telegram or GitHub account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6">
								<div className="flex flex-col gap-4">
									<form action={formAction}>
										<OauthLoginButton
											type="submit"
											name="provider"
											value="telegram"
										>
											<TelegramSvg />
											Login with Telegram
										</OauthLoginButton>
									</form>
									<form action={formAction}>
										<OauthLoginButton type="submit" name="p" value="github">
											<GitHubSvg />
											Login with GitHub
										</OauthLoginButton>
									</form>
								</div>

								<Br> Or continue with </Br>

								<Form form={form} action={formAction}>
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
										<Button
											type="submit"
											className="w-full"
											name="provider"
											value="credentials"
										>
											Login
										</Button>
									</div>
									<div className="text-center text-sm">
										Don&apos;t have an account?{" "}
										<Link href="#" className="underline underline-offset-4">
											Sign up
										</Link>
									</div>
								</Form>
								{state && <p>{state}</p>}
							</div>
						</CardContent>
					</Card>
				</div>
			)}
		</Model>
	);
}

