import type { GetServerSideProps } from "next";
import instance from "../../api/instance";
import Card from "../../components/Locations/LocationCard";
import styles from "../../styles/list.module.scss";
import { useEffect, useRef, useState } from "react";
import { ScrollTop } from "primereact/scrolltop";
import { ScrollPanel } from "primereact/scrollpanel";
import { ILocation, ILocationsData } from "../../types/types";
import { useRouter } from "next/router";

interface IList {
  data: ILocationsData;
}

function Locations({ data }: IList) {
  const router = useRouter();
  const [locations, setLocations] = useState<ILocation[] | []>([]);
  const [newLocations, setNewLocations] = useState<ILocation[] | []>([]);
  const [error, setError] = useState<string>("");

  const [page, setPage] = useState<number>(
    router.query.page ? parseInt(router.query.page as string) : 1
  );
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        const nextPage = page + 1;
        setPage(nextPage);
        router.push(`/location?page=${nextPage}`);
      }
    });
  }, [page, router]);

  useEffect(() => {
    if (!data) {
      setError("There is nothing here");
    }
    if (data) {
      setLastPage(data.info.pages);
      setNewLocations(data.results);
    }
  }, [data]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver?.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver?.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  useEffect(() => {
    if (newLocations.length) {
      const newLocationsData = [...locations, ...newLocations];

      setLocations(newLocationsData);
      setNewLocations([]);
    }
  }, [locations, newLocations]);

  return (
    <div className={styles.listContainer}>
      <ScrollPanel style={{ width: "98vw", height: "92vh" }}>
        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.list}>
          {locations.map((location, i) => {
            return i === locations.length - 1 &&
              lastPage &&
              page !== lastPage ? (
              <div
                key={`${location.id} - ${location.name}`}
                ref={setLastElement}
                className={styles.item}
              >
                <Card location={location} />
              </div>
            ) : (
              <div
                key={`${location.id} - ${location.name}`}
                className={styles.item}
              >
                <Card location={location} />
              </div>
            );
          })}
        </div>
        <ScrollTop target="parent" threshold={100} icon="pi pi-arrow-up" />
      </ScrollPanel>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let page = 1;
  let locations = null;
  if (context.query.page) {
    page = parseInt(context.query.page as string);
  }

  await instance
    .get(`location?page=${page}`)
    .then((data) => {
      locations = data.data;
    })
    .catch(() => {
      locations = null;
    });

  return {
    props: {
      data: locations,
    },
  };
};

export default Locations;
