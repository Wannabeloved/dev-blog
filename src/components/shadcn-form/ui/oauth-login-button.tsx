import { Button } from "@/components/ui/button";

export const OauthLoginButton = ({
	children,
	...props
}: {
	children: React.ReactNode;
} & React.ComponentProps<typeof Button>) => (
	<Button variant="outline" className="w-full" {...props}>
		{children}
	</Button>
);
