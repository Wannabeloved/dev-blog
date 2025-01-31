import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

// const ICONS_URL = "@fortawesome/free-solid-svg-icons";
// type FONT_AWESOME_ICONS =
// 	keyof typeof import("@fortawesome/free-solid-svg-icons");
// export enum ICONS {
// 	like = "faThumbsUp",
// }

export const ICONS = {
	like: async () =>
		(await import(`@fortawesome/free-solid-svg-icons/faThumbsUp`)).faThumbsUp,
};

export const getIcon = async (
	name: keyof typeof ICONS,
): Promise<IconDefinition | undefined> => {
	if (!name) return undefined;
	console.log("name!!!:: ", name);
	// console.log(
	// 	(await import(`@fortawesome/free-solid-svg-icons/${name}`))[name],
	// );
	console.log(name);
	return await ICONS[name]();
};
