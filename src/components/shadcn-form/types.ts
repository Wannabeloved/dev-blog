export type AuthAction = (
	prevState: string | undefined,
	formData: FormData,
) => Promise<"Invalid credentials." | "Something went wrong." | undefined>;

type Props = { action: AuthAction; width?: string };
export type AuthForm = (props: Props) => ReturnType<Model>;

type ModelProps = {
	action: AuthAction;
	children: Wrapper;
};
export type Model = (props: ModelProps) => ReturnType<Wrapper>;

type WrapperProps = {
	formAction: any;
	isPending: any;
	callbackUrl: any;
	errorMessage: any;
};
type Wrapper = (props: WrapperProps) => React.JSX.Element;

