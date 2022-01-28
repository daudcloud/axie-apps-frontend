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
    <div className={styles.cardWrapper}>
      <div className={styles.container}>
        <h1>Axie Card</h1>
        <div className={styles.cards}>
          {cards.map((card) => (
            <div className={styles.card} key={card.id}>
              <div className={styles.cardPart}>
                <div className={styles.partImage}>
                  <Image
                    src={`/images/axie-part/${card.classType}/${card.partType}.png`}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span>{card.part}</span>
                <span>{`(${card.cardType})`}</span>
              </div>
              <div className={styles.backgroundCard}>
                <Image
                  src={card.backgroundCard}
                  layout="fill"
                  objectFit="contain"
                />
                <div className={styles.info}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardEnergy}>{card.energy}</span>
                    <span className={styles.cardName}>{card.name}</span>
                  </div>
                  <div className={styles.backgroundInfo}>
                    <Image
                      src={`/images/bg-info-${card.classType.toLowerCase()}.png`}
                      layout="fill"
                      objectFit="contain"
                    />
                    <div className={styles.attackImage}>
                      <Image
                        src="/images/icon-atk.png"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <span>{card.damage}</span>
                  </div>
                  <div className={styles.backgroundInfo}>
                    <Image
                      src={`/images/bg-info-${card.classType.toLowerCase()}.png`}
                      layout="fill"
                      objectFit="contain"
                    />
                    <div className={styles.attackImage}>
                      <Image
                        src="/images/icon-def.png"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <span>{card.defense}</span>
                  </div>
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.cardEffect}>
                    <Image
                      src={card.effectIcon}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <span className={styles.cardDesc}>{card.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
