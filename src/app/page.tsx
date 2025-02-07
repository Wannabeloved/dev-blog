// "use client";

import Image from "next/image";
import styles from "./page.module.css";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/shared/Button";
import { increment } from "@/adapters/store/counter.slice";

import { Icon } from "@/lib/icons/Icon";
import { ICONS } from "@/lib/icons/getIcon";

export default function Home() {
	// const dispatch = useAppDispatch();
	// const counter = useAppSelector((store) => store.counter.value);
	return (
		<div className={styles.page}>
			<main className={styles.main}></main>
			<Button>
				<Icon icon={"like"} />
			</Button>
			{/* <Icon icon={faThumbsUp} /> */}
			<footer className={styles.footer}></footer>
		</div>
	);
}
