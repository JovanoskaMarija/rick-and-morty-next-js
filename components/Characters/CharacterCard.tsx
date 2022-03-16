import styles from "../../styles/card.module.scss";

import { ICharacter } from "../../types/types";
import Link from "next/link";

interface ICard {
  character: ICharacter;
}

function Card({ character }: ICard) {
  return (
    <Link
      href={{
        pathname: `/character/${character.id}`,
      }}
      passHref
    >
      <a>
        <div className={styles.card}>
          <img src={character.image} alt={`${character.name}`} />
          <div className={styles.infoCard}>
            <span className={styles.name}>{character.name}</span>
            <div>
              <div className={styles.info}>
                <span className={styles.label}>gender:</span>
                <span className={styles.value}>{character.gender}</span>
              </div>

              <div className={styles.info}>
                <span className={styles.label}>species:</span>
                <span className={styles.value}>{character.species}</span>
              </div>

              <div className={styles.info}>
                <span className={styles.label}>status:</span>
                <span className={styles.value}>{character.status}</span>
              </div>

              <div className={styles.info}>
                <span className={styles.label}>episodes:</span>
                <span className={styles.value}>{character.episodes}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default Card;
