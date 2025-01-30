"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/atoms/Button";
import { increment } from "@/features/counter.slice";

export default function Home() {
	const dispatch = useAppDispatch();
	const counter = useAppSelector((store) => store.counter.value);
	return (
		<div className={styles.page}>
			<main className={styles.main}></main>
			<Button onClick={() => dispatch(increment())}>{counter}</Button>
			<footer className={styles.footer}></footer>
		</div>
	);
}
