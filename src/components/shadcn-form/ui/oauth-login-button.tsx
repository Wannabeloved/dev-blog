import { Button } from "@/components/ui/button";

export const OauthLoginButton = ({
	children,
}: {
	children: React.ReactNode;
}) => (
	<Button variant="outline" className="w-full">
		{children}
	</Button>
);
