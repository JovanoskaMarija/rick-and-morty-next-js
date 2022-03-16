import { ICharacterDetail } from "../../types/types";
import styles from "../../styles/details.module.scss";
import { Button } from "primereact/button";
import { useRouter } from "next/router";

interface IDetails {
  character: ICharacterDetail;
}

function CharacterDetails({ character }: IDetails) {
  const router = useRouter();

  function handleBackBtnCLick() {
    router.push("/");
  }

  function handleLocationClick() {
    const locationURL = character.location.url.replace(
      "https://rickandmortyapi.com/api",
      ""
    );
    router.push(locationURL);
  }

  return (
    <>
      <Button
        icon="pi pi-arrow-left"
        className="p-button-rounded p-button-secondary back-btn"
        onClick={handleBackBtnCLick}
      />
      <div className={styles.details}>
        <div>
          <img src={character.image} alt={`${character.name}`} />
        </div>
        <div className={styles.infoCard}>
          <span className={styles.name}>{character.name}</span>
          <div>
            <div className={styles.info}>
              <span className={styles.label}>Gender:</span>
              <span className={styles.value}>
                {character.gender} ({character.status})
              </span>
            </div>

            <div className={styles.info}>
              <span className={styles.label}>Species:</span>
              <span className={styles.value}>{character.species}</span>
            </div>

            <div className={styles.info}>
              <span className={styles.label}>Episodes:</span>
              <span className={styles.value}>{character.episode.length}</span>
            </div>

            <div className={styles.info}>
              <span className={styles.label}>Created:</span>
              <span className={styles.value}>
                {new Date(character.created).toLocaleString()}
              </span>
            </div>

            <div className={styles.info}>
              <span className={styles.label}>Location:</span>
              <Button
                onClick={handleLocationClick}
                className="p-button-text p-button-plain"
              >
                <span className={styles.value}>{character.location.name}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CharacterDetails;
