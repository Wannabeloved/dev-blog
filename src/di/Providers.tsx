import { StoreProvider } from "./store";
import { StyledComponentsRegistry } from "./styled-components/registry";

type ProviderType = (props: { children: React.ReactNode }) => React.JSX.Element;
type ProviderPropsType = Record<string, any>;
type ProviderListType = [ProviderType, ProviderPropsType?];

const providers: ProviderListType[] = [
	[StoreProvider],
	[StyledComponentsRegistry],
];

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return providers.reduceRight(
		(acc, [Provider, props], i) => (
			<Provider key={`${Provider.name + i}`} {...(props || {})}>
				{acc}
			</Provider>
		),
		children,
	);
};
