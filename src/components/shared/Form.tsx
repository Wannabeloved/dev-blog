import { Form as ShadcnForm } from "@/components/ui/form";
import { startTransition } from "react";

export const Form = ({ form, action, children }) => {
	return (
		<ShadcnForm {...form}>
			<form
				action={action}
				onSubmit={form.handleSubmit((data, event) => {
					console.log("SUBMIT");
					console.log(event);
					startTransition(() => action(new FormData(event.target)));
				})}
			>
				{children}
			</form>
		</ShadcnForm>
	);
};
