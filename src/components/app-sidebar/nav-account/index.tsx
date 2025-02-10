import { NavLogin } from "./nav-login";
import { NavUser } from "./nav-user";

const NavAccount = ({
	user,
	Link,
}: {
	user?: Object;
	Link: React.FC<{ href: string; children: React.ReactElement }>;
}) => {
	return (
		<>
			{!user ? <NavUser user={user} Link={Link} /> : <NavLogin Link={Link} />}
		</>
	);
};

export default NavAccount;
