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
  const [slpPrice, setSlpPrice] = useState("");
  const [ethPrice, setEthPrice] = useState("");
  const [axsPrice, setAxsPrice] = useState("");

  const getSlpPrice = async () => {
    const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=SLPUSDT")
    const data = await res.json()
    // console.log(parseFloat(data.price))
    return parseFloat(data.price)
  }
  const getEthPrice = async () => {
    const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT")
    const data = await res.json()
    // console.log(parseFloat(data.price))
    return parseFloat(data.price)
  }
  const getAxsPrice = async () => {
    const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=AXSUSDT")
    const data = await res.json()
    // console.log(parseFloat(data.price))
    return parseFloat(data.price)
  }

  useEffect(async () => {
    let slp = await getSlpPrice()
    let eth = await getEthPrice()
    let axs = await getAxsPrice()
    setSlpPrice(slp)
    setEthPrice(eth)
    setAxsPrice(axs)
  }, [])

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
        <a className={styles.logo}>Ax</a>
      </Link>
      <Link href="/">
        <a className={page === "Home" ? styles.active : null}>Home</a>
      </Link>

      <Link href="/card">
        <a className={page === "Card" ? styles.active : null}>Card</a>
      </Link>
      <div className={styles.tokenContainer}>
        <span className={styles.axieToken}>
          <div className={styles.imgToken}>
            <Image src="/images/slp.png" width="20px" height="20px" />
          </div>
          {`$${slpPrice}`}
        </span>
        <span className={styles.axieToken}>
          <div className={styles.imgToken}>
            <Image src="/images/eth.png" width="20px" height="20px" />
          </div>
          {`$${ethPrice}`}
        </span>
        <span className={styles.axieToken}>
          <div className={styles.imgToken}>
            <Image src="/images/axs.png" width="20px" height="20px" />
          </div>
          {`$${axsPrice}`}
        </span>
      </div>
      {!user ? (
        <>
          <Link href="/login">
            <a
              className={[
                styles.login,
                page === "Login" ? styles.active : null,
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
