import { Button } from "primereact/button";
import { ILocationDetail } from "../../types/types";
import styles from "../../styles/details.module.scss";
import { useRouter } from "next/router";

interface IDetails {
  location: ILocationDetail;
}

function LocationDetails({ location }: IDetails) {
  const router = useRouter();

  function handleBackBtnCLick() {
    router.push("/location");
  }

  function handleResidentClick(id: string) {
    router.push("/character/" + id);
  }
  return (
    <>
      <Button
        icon="pi pi-arrow-left"
        className="p-button-rounded p-button-secondary back-btn"
        onClick={handleBackBtnCLick}
      />
      <div className={styles.details}>
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
                {new Date(location.created).toLocaleString()}
              </span>
            </div>

            {location.residents.length > 0 && (
              <div className={styles.info}>
                <span className={styles.label}>Residents:</span>
                <div className={styles.residents}>
                  {location.residents.map((resident, index) => {
                    const residentURL = resident.replace(
                      "https://rickandmortyapi.com/api/",
                      ""
                    );

                    const residentId = residentURL.split("/")[1];
                    return (
                      <Button
                        key={index}
                        onClick={() => handleResidentClick(residentId)}
                        className="p-button-text p-button-plain"
                      >
                        <span className={styles.residentValue}>
                          Resident {residentId}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationDetails;
