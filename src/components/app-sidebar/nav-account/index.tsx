import { useUser } from "@/adapters/store/hooks/useUser";
import { NavLogin } from "./nav-login";

import { NavUser } from "./nav-user";
import { signOutAction } from "@/app/(auth)/actions";

const NavAccount = ({
	Link,
}: {
	user?: Object;
	Link: React.FC<{ href: string; children: React.ReactElement }>;
}) => {
	const { user, isLoading, error, logout } = useUser();

	if (isLoading) return <div>Загрузка...</div>;
	// if (error) return <div>Ошибка: {error}</div>;
	if (!user) return <NavLogin Link={Link} />;

	return (
		<NavUser
			user={user}
			Link={Link}
			signOutAction={signOutAction}
			logout={logout}
		/>
	);
};

export default NavAccount;
