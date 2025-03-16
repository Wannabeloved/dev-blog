import type { doComparePasswords as signature } from "@/core/application/interfaces/index";
export const doComparePasswords: signature = (password1, password2) => {
	let isIdentical = false;
	if (password1 === password2) isIdentical = true;
	return isIdentical;
};
