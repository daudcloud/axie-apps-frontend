import Router from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import styles from "./styles.module.scss";

const Dashboard = () => {
  const [user, setUser] = useUser();

  useEffect(async () => {
    const res = user
      ? await fetch(
          `https://game-api.axie.technology/logs/pvp/${user.roninAddress}`
        )
      : null;
    if (!res) return Router.push("/login");
    const data = await res.json();
    console.log(data);
  }, [user]);

  return (
    <div>
      <div className={styles.col1}>
        <div className={styles.userInfo}></div>
        <div className={styles.userTeam}></div>
      </div>
      <div className={styles.col2}>
        <div className={styles.userStatistic}></div>
        <div className={styles.userBattles}></div>
      </div>
    </div>
  );
};

export default Dashboard;
