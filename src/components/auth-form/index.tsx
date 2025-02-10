"use client";
import type { AuthForm as Signature } from "./types";

import AuthFormModel from "./model";

import { Icon } from "../shared/Icon";
import FormInput from "./ui/form-input";
import FormLabel from "./ui/form-label";
import MainContainer from "./ui/main-container";
import Form from "./ui/form";
import Title from "./ui/title";
import InputsContainer from "./ui/inputs-container";
import SubmitButton from "./ui/submit-button";
import ErrorMessageContainer from "./ui/error-message-container";
import { Button } from "@/components/ui/button";

const AuthForm: Signature = ({ width, action }) => {
	return (
		<AuthFormModel action={action}>
			{({ formAction, isPending, callbackUrl, errorMessage }) => (
				<Form action={formAction}>
					<MainContainer width={width}>
						<Title>Please log in to continue.</Title>
						<InputsContainer>
							<div>
								<FormLabel htmlFor="email">Email</FormLabel>
								<div style={{ position: "relative" }}>
									<FormInput
										id="email"
										type="text"
										name="login"
										placeholder="Enter your login"
										required
									/>
									<Icon icon={"like"} />
								</div>
							</div>
							<div>
								<FormLabel htmlFor="password">Password</FormLabel>
								<div style={{ position: "relative" }}>
									<FormInput
										id="password"
										type="password"
										name="password"
										placeholder="Enter password"
										required
										minLength={6}
									/>
									<Icon icon={"like"} />
								</div>
							</div>
						</InputsContainer>
						<input type="hidden" name="redirectTo" value={callbackUrl} />
						<Button type="submit" aria-disabled={isPending}>
							Log in <Icon icon={"like"} />
						</Button>
						<ErrorMessageContainer aria-live="polite" aria-atomic="true">
							{errorMessage && (
								<>
									<Icon icon={"like"} />
									<p
										style={{
											fontSize: "0.875rem",
											color: "#EF4444",
										}}
									>
										{errorMessage}
									</p>
								</>
							)}
						</ErrorMessageContainer>
					</MainContainer>
				</Form>
			)}
		</AuthFormModel>
	);
};
export default AuthForm;
