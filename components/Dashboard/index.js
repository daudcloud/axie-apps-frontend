import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { getAxies, getBattles, getUserInfo } from "../../fetch-api/getData";
import styles from "./styles.module.scss";

const Dashboard = () => {
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
    const _battles = (await getBattles(user)) || null;
    const _userInfo = (await getUserInfo(user)) || null;
    const _axies = (await getAxies(user)) || null;
    if (!_battles || _battles === "error") return setError(true);
    if (!_userInfo || _battles === "error") return setError(true);
    if (!_axies || _battles === "error") return setError(true);
    setBattles(_battles.battles);
    setUserInfo(_userInfo);
    setAxies(_axies);
    setLoading(false);
  }, [user]);

  console.log(battles);
  console.log(userInfo);
  console.log(axies);

  return (
    <div>
      {error ? <h1>Server API down or ronin address invalid</h1> : null}
      {!ronin ? (
        <h1 className={styles.unset}>Please Set Your Ronin Address First</h1>
      ) : (
        <>
          <div className={styles.col1}>
            <div className={styles.userInfo}>
              {!loading ? (
                <>
                  <div className={styles.userImage}>
                    <Image
                      src={`https://assets.axieinfinity.com/axies/${axies[0].id}/axie/axie-full-transparent.png`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </>
              ) : null}
            </div>
            <div className={styles.userTeam}></div>
          </div>
          <div className={styles.col2}>
            <div className={styles.userStatistic}></div>
            <div className={styles.userBattles}></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
