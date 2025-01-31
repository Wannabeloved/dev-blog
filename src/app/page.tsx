"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/atoms/Button";
import { increment } from "@/features/counter.slice";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
	const dispatch = useAppDispatch();
	const counter = useAppSelector((store) => store.counter.value);
	return (
		<div className={styles.page}>
			<main className={styles.main}></main>
			<Button onClick={() => dispatch(increment())}><FontAwesomeIcon icon={faThumbsUp} className="fa-fw" />{counter}</Button>
			<footer className={styles.footer}></footer>
		</div>
	);
}
