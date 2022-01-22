import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

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
    <>
      {!timeup && (
        <div className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.col}>
                <h1>Lunar New Year 2022</h1>
                <p>
                  Release an axie to Luna's Landing for the Lunar New Year
                  celebration. In return, your axie will send you a limited
                  edition land item.
                </p>
                <p className="timeline">
                  Timeline: 20 Jan, 2022 - 20 Feb, 2022
                </p>
                <p>Expires In:</p>
                <p>{`${timeLeft.days}days ${timeLeft.hours}hours ${timeLeft.minutes}minutes ${timeLeft.seconds}seconds`}</p>
                <a
                  href="https://marketplace.axieinfinity.com/lunacian-express/events/lunar-new-year-2022/"
                  target="_blank"
                >
                  <button>See in Marketplace</button>
                </a>
              </div>
              <div className={styles.col}>
                <div className={styles.imgContainer}>
                  <Image
                    src="/images/lny-2022.jpg"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
