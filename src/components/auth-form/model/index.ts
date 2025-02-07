"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import type { Model } from "../types";

const AuthFormModel: Model = ({ action: authenticate, children }) => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";
	const [errorMessage, formAction, isPending] = useActionState(
		authenticate,
		undefined,
	);

	return children({ errorMessage, formAction, isPending, callbackUrl });
};

export default AuthFormModel;
