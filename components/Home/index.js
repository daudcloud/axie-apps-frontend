import { useEffect, useState } from "react";
import styles from "./styles/home.module.scss";
import Hero from "./Hero";
import ExploreCards from "./ExploreCards";

const Home = () => {
  const [timeup, setTimeup] = useState(false);
  const calculateTimeLeft = () => {
    const endTime = 1645401600000;
    const difference = new Date(endTime) - new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {};
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (Object.keys(timeLeft).length === 0) return setTimeup(true);
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        {!timeup && <Hero styles={styles} timeLeft={timeLeft} />}
        <ExploreCards />
      </div>
    </div>
  );
};

export default Home;
