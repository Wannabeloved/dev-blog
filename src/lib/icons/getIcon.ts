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
	signOut: async () =>
		(await import(`@fortawesome/free-solid-svg-icons/faRightFromBracket`))
			.faRightFromBracket,
	caretLeft: async () =>
		(await import(`@fortawesome/free-solid-svg-icons/faCaretLeft`)).faCaretLeft,
	file: async () =>
		(await import(`@fortawesome/free-solid-svg-icons/faFileLines`)).faFileLines,
	users: async () =>
		(await import(`@fortawesome/free-solid-svg-icons/faUsers`)).faUsers,
	calendar: async () =>
		(await import(`@fortawesome/free-solid-svg-icons/faCalendar`)).faCalendar,
	comment: async () =>
		(await import(`@fortawesome/free-solid-svg-icons/faComment`)).faComment,
	save: async () =>
		(await import(`@fortawesome/free-solid-svg-icons/faFloppyDisk`))
			.faFloppyDisk,
	trash: async () =>
		(await import(`@fortawesome/free-solid-svg-icons/faTrashCan`)).faTrashCan,
	paperPlane: async () =>
		(await import(`@fortawesome/free-solid-svg-icons/faPaperPlane`))
			.faPaperPlane,
	penToSquare: async () =>
		(await import(`@fortawesome/free-solid-svg-icons/faPenToSquare`))
			.faPenToSquare,
	circleUser: async () =>
		(await import(`@fortawesome/free-solid-svg-icons/faCircleUser`))
			.faCircleUser,
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
	return await ICONS["circleUser"]();
};
