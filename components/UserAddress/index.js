import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { getAxies, getBattles, getUserInfo } from "../../fetch-api/getData";
import styles from "./styles.module.scss";

const UserAddress = ({ address }) => {
  const [user, setUser] = useUser();
  const [ronin, setRonin] = useState(false);
  const [battles, setBattles] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [axies, setAxies] = useState([]);
  const [axieIndex, setAxieIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(async () => {
    setLoading(true);
    if (!user) return Router.push("/login");
    const roninAddress = user.roninAddress;
    if (roninAddress === "") return setRonin(false);
    setRonin(true);
    const _battles = await getBattles(user);
    const _userInfo = await getUserInfo(user);
    const _axies = await getAxies(user);
    if (!_battles || _battles === "error") return setError(true);
    if (!_userInfo || _battles === "error") return setError(true);
    if (!_axies || _battles === "error") return setError(true);
    setBattles(_battles.battles);
    setUserInfo(_userInfo);
    setAxies(_axies);
    setLoading(false);
  }, [user]);

  const changeImage = () => {
    if (axieIndex >= 2) return setAxieIndex(0);
    setAxieIndex((prev) => prev + 1);
  };

  useEffect(() => {
    let timer = setTimeout(changeImage, 3000);
    return () => clearTimeout(timer);
  }, [axieIndex]);

  // console.log(battles);
  console.log(userInfo);
  // console.log(axies);
  // console.log(address);

  const formattedString = (address) => {
    let newAddress = "";
    const _address = address.replace("ronin:", "0x");
    newAddress += `${_address.substring(0, 4)}...${_address.substring(38)}`;
    return newAddress;
  };

  const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div>
      {error ? <h1>Server API down or ronin address invalid</h1> : null}
      {!loading ? (
        !ronin ? (
          <h1 className={styles.unset}>Please Set Your Ronin Address First</h1>
        ) : (
          <>
            <div className={styles.col1}>
              <div className={styles.userInfo}>
                <div className={styles.userImage}>
                  <Image
                    src={`https://assets.axieinfinity.com/axies/${axies[axieIndex].id}/axie/axie-full-transparent.png`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={styles.userName}>{userInfo.name}</div>
                <div
                  className={styles.userAddress}
                  onClick={() => copyToClipboard(address)}
                >
                  {formattedString(address)}
                  <i className="fa-solid fa-copy"></i>
                </div>
                <div className={styles.userRank}>
                  {new Intl.NumberFormat("en-EN").format(userInfo.rank)}
                </div>
              </div>
              <div className={styles.userTeam}></div>
            </div>
            <div className={styles.col2}>
              <div className={styles.userStatistic}></div>
              <div className={styles.userBattles}></div>
            </div>
          </>
        )
      ) : null}
    </div>
  );
};

export default UserAddress;
