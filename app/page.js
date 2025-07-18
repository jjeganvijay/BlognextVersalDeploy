'use client';

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import logo from "./logo.png";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <div className={styles.logoContainer}>
          <Image src={logo} width={48} height={48} alt="Logo" priority />
          <span className={styles.title}>Bloging World</span>
        </div>
        <nav className={styles.navLinks}>
          <Link href="/blog" className={styles.link}>Try Demo</Link>
          <Link href="/login" className={styles.link}>User Login</Link>
          <Link href="/adminlogin" className={styles.link}>Admin Login</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Welcome to Bloging World ✨</h1>
          <p className={styles.heroSubtitle}>
            Share your ideas, post your thoughts, or manage your blog as an admin.
            <br></br><strong>Try the Demo</strong></p>
          <div className={styles.buttonGroup}>
            <Link href="/login" className={styles.button}>Login as User</Link>
            <Link href="/adminlogin" className={styles.buttonAlt}>Login as Admin</Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} My Bloging World. All rights reserved.</p>
      </footer>
    </div>
  );
}
