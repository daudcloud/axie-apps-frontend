import Link from "next/link";
import styles from "./styles.module.css";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/dashboard">
        <a>Dashboard</a>
      </Link>

      <Link href="/card">
        <a>Card</a>
      </Link>
      <Link href="/login">
        <a className={styles.login}>
          <span>Login</span>
        </a>
      </Link>
      <Link href="/signup">
        <a className={styles.signup}>
          <span>Signup</span>
        </a>
      </Link>
    </nav>
  );
};

export default Navigation;
