import Link from "next/link";
import styles from "./styles/nav.module.scss";

const Navbar = ({ page }) => {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a className={styles.logo}>Axinfinity</a>
      </Link>
      <Link href="/">
        <a className={page === "home" ? styles.active : null}>Home</a>
      </Link>
      <Link href="/dashboard">
        <a className={page === "dashboard" ? styles.active : null}>Dashboard</a>
      </Link>

      <Link href="/card">
        <a className={page === "card" ? styles.active : null}>Card</a>
      </Link>
      <Link href="/login">
        <a
          className={[
            styles.login,
            page === "login" ? styles.active : null,
          ].join(" ")}
        >
          Login
        </a>
      </Link>
      <Link href="/signup">
        <a className={styles.signup}>Signup</a>
      </Link>
    </nav>
  );
};

export default Navbar;
