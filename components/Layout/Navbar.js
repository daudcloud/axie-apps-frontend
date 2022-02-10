import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import styles from "./styles/nav.module.scss";
import User from "./User";

const Navbar = ({ page }) => {
  const [user, setUser] = useUser();
  const [modal, setModal] = useState(false);
  const [tokenPrice, setTokenPrice] = useState({
    slp: "",
    eth: "",
    axs: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const getSlpPrice = async () => {
    const res = await fetch(
      "https://api.binance.com/api/v3/ticker/price?symbol=SLPUSDT"
    );
    const data = await res.json();
    // console.log(parseFloat(data.price))
    return parseFloat(data.price);
  };
  const getEthPrice = async () => {
    const res = await fetch(
      "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
    );
    const data = await res.json();
    // console.log(parseFloat(data.price))
    return parseFloat(data.price);
  };
  const getAxsPrice = async () => {
    const res = await fetch(
      "https://api.binance.com/api/v3/ticker/price?symbol=AXSUSDT"
    );
    const data = await res.json();
    // console.log(parseFloat(data.price))
    return parseFloat(data.price);
  };

  useEffect(async () => {
    const slp = await getSlpPrice();
    const eth = await getEthPrice();
    const axs = await getAxsPrice();
    setTokenPrice({ ...tokenPrice, slp, eth, axs });
  }, []);

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
        <a className={styles.logo}>AxFinity</a>
      </Link>
      <div
        className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen((prev) => !menuOpen)}
      >
        <div className={styles.slice}></div>
        <div className={styles.slice}></div>
        <div className={styles.slice}></div>
      </div>
      <div className={`${styles.navList} ${menuOpen ? styles.open : ""}`}>
        <li
          className={page === "home" ? styles.active : null}
          onClick={() => setMenuOpen(false)}
        >
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li
          className={page === "card" ? styles.active : null}
          onClick={() => setMenuOpen(false)}
        >
          <Link href="/card">
            <a>Card</a>
          </Link>
        </li>

        <li className={styles.tokenContainer}>
          <span className={styles.axieToken}>
            <div className={styles.imgToken}>
              <Image src="/images/slp.png" layout="fill" objectFit="contain" />
            </div>
            {`$${tokenPrice.slp}`}
          </span>
          <span className={styles.axieToken}>
            <div className={styles.imgToken}>
              <Image src="/images/eth.png" layout="fill" objectFit="contain" />
            </div>
            {`$${tokenPrice.eth}`}
          </span>
          <span className={styles.axieToken}>
            <div className={styles.imgToken}>
              <Image src="/images/axs.png" layout="fill" objectFit="contain" />
            </div>
            {`$${tokenPrice.axs}`}
          </span>
        </li>
        {!user ? (
          <>
            <li
              className={[
                styles.login,
                page === "login" ? styles.active : null,
              ].join(" ")}
              onClick={() => setMenuOpen(false)}
            >
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
            <li className={styles.signup} onClick={() => setMenuOpen(false)}>
              <Link href="/signup">
                <a>Signup</a>
              </Link>
            </li>
          </>
        ) : (
          <li className={styles.userContainer}>
            <User setModal={setModal} setMenuOpen={setMenuOpen} />
          </li>
        )}
      </div>
      {modal && (
        <div className={styles.modalWrapper}>
          <div className={styles.modal}>
            <h1>Are you sure u want to logout?</h1>
            <div className={styles.confirmButton}>
              <button onClick={logout}>Yes</button>
              <button onClick={cancel}>No</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
