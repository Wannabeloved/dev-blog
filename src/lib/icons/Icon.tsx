import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getIcon, ICONS } from "./getIcon";

export const Icon = async ({ icon }: { icon: keyof typeof ICONS }) => {
	const iconn = await getIcon(icon);
	if (!iconn) return null;
	return <FontAwesomeIcon icon={iconn} />;
};
