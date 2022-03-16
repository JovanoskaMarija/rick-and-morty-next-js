import styles from "../../styles/card.module.scss";

import { ILocation } from "../../types/types";
import Link from "next/link";

interface ICard {
  location: ILocation;
}

function Card({ location }: ICard) {
  return (
    <div className={styles.card}>
      <Link
        href={{
          pathname: `/location/${location.id}`,
        }}
        passHref
      >
        <a>
          <div className={styles.infoCard}>
            <span className={styles.name}>{location.name}</span>
            <div>
              <div className={styles.info}>
                <span className={styles.label}>Type:</span>
                <span className={styles.value}>{location.type}</span>
              </div>

              <div className={styles.info}>
                <span className={styles.label}>Dimension:</span>
                <span className={styles.value}>{location.dimension}</span>
              </div>

              <div className={styles.info}>
                <span className={styles.label}>Created:</span>
                <span className={styles.value}>
                  {new Date(location.created).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default Card;
