import Router from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import styles from "./styles.module.scss";

const Dashboard = () => {
  const [user, setUser] = useUser();
  const [ronin, setRonin] = useState(false);
  const [battles, setBattles] = useState({});

  useEffect(async () => {
    if (!user) {
      return Router.push("/login");
    }
    const roninAddress = user.roninAddress;
    if (roninAddress === "") return;
    setRonin(true);
    const res = await fetch(
      `https://game-api.axie.technology/logs/pvp/${user.roninAddress}`
    );
    const data = await res.json();
    setBattles(data);
    console.log(data);
  }, []);

  return (
    <div>
      {!ronin ? (
        <h1>Please Set Your Ronin Address First</h1>
      ) : (
        <>
          <div className={styles.col1}>
            <div className={styles.userInfo}></div>
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
