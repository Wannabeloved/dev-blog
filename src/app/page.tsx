// "use client";

import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/shared/Button";
import { increment } from "@/adapters/store/counter.slice";

import { Icon } from "@/lib/icons/Icon";
import { ICONS } from "@/lib/icons/getIcon";
import HomeWidgets from "@/components/home-widgets";

export default function Home() {
	// const dispatch = useAppDispatch();
	// const counter = useAppSelector((store) => store.counter.value);
	return (
		<main className={`w-full`}>
			<HomeWidgets></HomeWidgets>
		</main>
	);
}
