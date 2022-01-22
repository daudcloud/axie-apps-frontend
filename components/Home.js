import { useEffect, useState } from "react";

const Home = () => {
  const [timeup, setTimeup] = useState(false);
  const calculateTimeLeft = () => {
    const year = new Date().getFullYear();
    const difference = +new Date(1645315200000) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)) + 1,
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    isTimeup();
    console.log(timeLeft);
    return () => clearTimeout(timer);
  });

  const isTimeup = () => {
    if (
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      setTimeup(true);
      return console.log("time up");
    }
  };

  return (
    <>
      {
        <div className="hero">
          <div className="row">
            <div className="col">
              <h1>Lunar New Year 2022</h1>
              <p>
                Release an axie to Luna's Landing for the Lunar New Year
                celebration. In return, your axie will send you a limited
                edition land item.
              </p>
              <p className="timeline">Timeline: 20 Jan, 2022 - 20 Feb, 2022</p>
              <p>{`${timeLeft.days}days ${timeLeft.hours}hours ${timeLeft.minutes}minutes ${timeLeft.seconds}seconds`}</p>
            </div>
            <div className="col"></div>
          </div>
        </div>
      }
    </>
  );
};

export default Home;
