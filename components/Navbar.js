import React from "react";
import Link from "next/link";
import styles from "../styles/home.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navmain}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
