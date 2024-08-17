import Image from "next/image";
import styles from "../styles/home.module.css";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <h1>Hunter Coder</h1>
        <Image
          className={styles.img}
          src="/huntercoder.avif"
          width={356}
          height={216}
        ></Image>
        <h1>Latest Blogs</h1>
        <div className={styles.grid}>
          <Link href="" className={styles.card}>
            <h2>
              Next.js 15 RC <span>-&gt;</span>
            </h2>
            <p>The Next.js 15 Release Candidate (RC) is now available.</p>
          </Link>

          <Link
            href=""
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Next.js 14.2 <span>-&gt;</span>
            </h2>
            <p>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </Link>

          <Link
            href=""
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Next.js 14.1 <span>-&gt;</span>
            </h2>
            <p>Explore starter templates for Next.js.</p>
          </Link>

          <Link
            href=""
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Next.js 14 <span>-&gt;</span>
            </h2>
            <p>
              Instantly deploy your Next.js site to a shareable URL with Vercel.
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}
