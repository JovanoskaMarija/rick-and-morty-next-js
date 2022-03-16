import Link from "next/link";
import styles from "./header.module.scss";

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="logo" />
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/">Characters</Link>
            </li>
            <li>
              <Link href="/location">Locations</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
