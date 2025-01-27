import Image from "next/image";
import styles from "./page.module.css";

import { Button } from "@/components/atoms/Button";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}></main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
