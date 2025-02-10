"use client";

import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
	Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

export function NavLogin({
	Link,
}: {
	Link: React.FC<{ href: string; children: React.ReactElement }>;
}) {
	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex">
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<Link href="/sign-in" className="w-full h-full">
						<>
							{/* <Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
							</Avatar> */}
							<div className="grid flex-1 text-sm leading-tight text-center">
								<span className="truncate font-semibold">Sign-in</span>
							</div>
							{/* <ChevronsUpDown className="ml-auto size-4" /> */}
						</>
					</Link>
				</SidebarMenuButton>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<Link href="/sign-up" className="w-full h-full">
						<>
							{/* <Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
							</Avatar> */}
							<div className="grid flex-1 text-sm leading-tight text-center">
								<span className="truncate font-semibold">Sign-up</span>
							</div>
							{/* <ChevronsUpDown className="ml-auto size-4" /> */}
						</>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
