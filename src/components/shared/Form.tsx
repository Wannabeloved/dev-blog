import { Form as ShadcnForm } from "@/components/ui/form";
import { startTransition } from "react";

export const Form = ({ form, action, children }) => {
	return (
		<ShadcnForm {...form}>
			<form
				action={action}
				onSubmit={form.handleSubmit((data, event) => {
					console.log("SUBMIT");
					// console.log(event);
					console.log(data);
					const formData = new FormData();
					for (const key in data) {
						formData.append(key, data[key]);
					}
					startTransition(() => action(formData));
				})}
			>
				{children}
			</form>
		</ShadcnForm>
	);
};

