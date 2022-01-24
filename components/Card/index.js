import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const Card = () => {
  const [cards, setCards] = useState([]);
  useEffect(async () => {
    const res = await fetch("http://localhost:5000/api/card");
    const { data } = await res.json();
    console.log(data);
    setCards(data);
  }, []);
  return (
    <>
      <div className={styles.container}>
        <h1>Axie Card</h1>
        <div className={styles.cards}>
          {cards.map((card) => (
            <div className={styles.card}>
              <div className={styles.backgroundCard}>
                <Image
                  src={card.backgroundCard}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <span className={styles.cardEnergy}>{card.energy}</span>
              <span className={styles.cardName}>{card.name}</span>
              <div className={styles.backgroundInfo}>
                <Image
                  src={card.backgroundInfo}
                  layout="fill"
                  objectFit="cover"
                />
                <span>{card.damage}</span>
              </div>
              <div className={styles.backgroundInfo}>
                <Image
                  src={card.backgroundInfo}
                  layout="fill"
                  objectFit="cover"
                />
                <span>{card.defense}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Card;
