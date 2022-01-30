import Link from "next/link";
import Router from "next/router";
import { useUser } from "../../contexts/UserContext";
import styles from "./styles/nav.module.scss";
import User from "./User";

const Navbar = ({ page }) => {
  const [user, setUser] = useUser();
  const logout = (e) => {
    e.preventDefault();
    if (!user) return;
    window.localStorage.removeItem("token");
    Router.reload();
  };
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a className={styles.logo}>Axinfinity</a>
      </Link>
      <Link href="/">
        <a className={page === "home" ? styles.active : null}>Home</a>
      </Link>

      <Link href="/card">
        <a className={page === "card" ? styles.active : null}>Card</a>
      </Link>
      {!user ? (
        <>
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
        </>
      ) : (
        <User logout={logout} user={user} />
      )}
    </nav>
  );
};

export default Navbar;
