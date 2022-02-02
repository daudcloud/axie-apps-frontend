import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import styles from "./styles/nav.module.scss";
import User from "./User";

const Navbar = ({ page }) => {
  const [user, setUser] = useUser();
  const [modal, setModal] = useState(false);
  const logout = (e) => {
    e.preventDefault();
    if (!user) return;
    window.localStorage.removeItem("token");
    setModal(false);
    Router.reload();
  };

  const cancel = (e) => {
    e.preventDefault();
    setModal(false);
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
        <User logout={logout} setModal={setModal} user={user} />
      )}
      {modal && (
        <div className={styles.modalWrapper}>
          <div className={styles.modal}>
            <h1>Are you sure u want to logout?</h1>
            <button onClick={logout}>Yes</button>
            <button onClick={cancel}>No</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
