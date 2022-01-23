import Image from "next/image";

const Hero = ({ styles, timeLeft }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.row}>
        <div className={styles.col}>
          <h1>Lunar New Year 2022</h1>
          <p>
            Release an axie to Luna's Landing for the Lunar New Year
            celebration. In return, your axie will send you a limited edition
            land item.
          </p>
          <p className={styles.timeline}>
            Timeline: 20 Jan, 2022 - 20 Feb, 2022
          </p>
          <p className={styles.expires}>Expires In:</p>
          <p className={styles.timeleft}>
            <span>{timeLeft.days}</span>days
            <span> {timeLeft.hours}</span>hours
            <span> {timeLeft.minutes}</span>minutes
            <span> {timeLeft.seconds}</span>seconds
          </p>
          <button>
            <a
              href="https://marketplace.axieinfinity.com/lunacian-express/events/lunar-new-year-2022/"
              target="_blank"
              className="marketplace"
            >
              See on Marketplace
            </a>
          </button>
        </div>
        <div className={styles.col}>
          <div className={styles.imgContainer}>
            <Image src="/images/lny-2022.jpg" layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
