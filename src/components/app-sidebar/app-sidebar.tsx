"use client";

import * as React from "react";
import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
	Settings2,
	SquareTerminal,
	Users,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { TeamSwitcher } from "./team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import NavAccount from "./nav-account/index";
import AppLogo from "./app-logo";
import { useUser } from "@/adapters/store/hooks/useUser";

// This is sample data.
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Playground",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "History",
					url: "#",
				},
				{
					title: "Starred",
					url: "#",
				},
				{
					title: "Settings",
					url: "#",
				},
			],
		},
		{
			title: "Models",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Genesis",
					url: "#",
				},
				{
					title: "Explorer",
					url: "#",
				},
				{
					title: "Quantum",
					url: "#",
				},
			],
		},
		{
			title: "Documentation",
			url: "#",
			icon: BookOpen,
			items: [
				{
					title: "Introduction",
					url: "#",
				},
				{
					title: "Get Started",
					url: "#",
				},
				{
					title: "Tutorials",
					url: "#",
				},
				{
					title: "Changelog",
					url: "#",
				},
			],
		},
		{
			title: "Администрирование",
			url: "/admin",
			icon: Settings2,
			items: [
				{
					title: "Пользователи",
					url: "/admin/users",
				},
				{
					title: "Настройки",
					url: "#",
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useUser();
	const isAdmin = user?.roleId === 0;

	// Фильтруем пункты меню в зависимости от роли пользователя
	const filteredNavMain = data.navMain.filter((item) => {
		// Если это не раздел администрирования, показываем всем
		if (item.title !== "Администрирование") return true;
		// Раздел администрирования показываем только админам
		return isAdmin;
	});

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<AppLogo Link={Link} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={filteredNavMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavAccount Link={Link} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

