// import type { GetServerSideProps } from "next";
// import instance from "../api/instance";
// import Card from "../components/Characters/CharacterCard";
// import Filters from "../components/Characters/Filters";
// import styles from "../styles/list.module.scss";
// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { ScrollTop } from "primereact/scrolltop";
// import { ScrollPanel } from "primereact/scrollpanel";

// import { ICharacterData, ICharacter, ICharactersData } from "../types/types";
// import { useRouter } from "next/router";
// import useDebounceHook from "../hooks/useDebounceHook";
// import usePushHook from "../hooks/usePushHook";
// import { objectToQueryString } from "../utils/objectToQueryString";

// interface IList {
//   data: ICharactersData;
// }

// function Home({ data }: IList) {
//   const router = useRouter();
//   const push = usePushHook();
//   const [characters, setCharacters] = useState<ICharacter[] | []>([]);
//   const [newCharacters, setNewCharacters] = useState<ICharacter[] | []>([]);
//   const [error, setError] = useState<string>("");

//   const [page, setPage] = useState<number>(
//     router.query.page ? parseInt(router.query.page as string) : 1
//   );
//   const [lastPage, setLastPage] = useState<number | null>(null);
//   const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);

//   // const [statusFilter, setStatusFilter] = useState<string>("");
//   // const [nameFilter, setNameFilter] = useState<string>("");
//   // const debouncedNameFilter = useDebounceHook(nameFilter, 350);

//   const observer = useRef<IntersectionObserver>();

//   // const filters = useMemo(() => {
//   //   return objectToQueryString({
//   //     name: debouncedNameFilter,
//   //     status: statusFilter,
//   //   });
//   // }, [debouncedNameFilter, statusFilter]);
//   // console.log("filterss :", filters);
//   console.log("page :", page);

//   useEffect(() => {
//     observer.current = new IntersectionObserver((entries) => {
//       const first = entries[0];
//       if (first.isIntersecting) {
//         const nextPage = page + 1;
//         setPage(nextPage);
//         router.replace(`/?page=${nextPage}`, undefined, { shallow: true });
//         // router.push(`/?page=${nextPage}${filters}`, undefined, {
//         //   shallow: true,
//         // });
//       }
//     });
//   }, [page, router]);

//   useEffect(() => {
//     if (!data) {
//       setError("There is nothing here");
//     }
//     if (data) {
//       setLastPage(data.info.pages);
//       setNewCharacters(data.results);
//     }
//   }, [data]);

//   useEffect(() => {
//     const currentElement = lastElement;
//     const currentObserver = observer.current;

//     if (currentElement) {
//       currentObserver?.observe(currentElement);
//     }

//     return () => {
//       if (currentElement) {
//         currentObserver?.unobserve(currentElement);
//       }
//     };
//   }, [lastElement]);

//   // useEffect(() => {
//   //   setCharacters([]);
//   //   push({
//   //     pathname: "/",
//   //     query: { page: 1, name: debouncedNameFilter, status: statusFilter },
//   //   });
//   // }, [debouncedNameFilter, push, statusFilter]);

//   useEffect(() => {
//     if (newCharacters.length) {
//       const newCharactersData = [...characters, ...newCharacters];

//       setCharacters(newCharactersData);
//       setNewCharacters([]);
//     }
//   }, [characters, newCharacters]);

//   return (
//     <div className={styles.listContainer}>
//       <ScrollPanel style={{ width: "98vw", height: "94vh" }}>
//         {/* <Filters
//           nameFilter={nameFilter}
//           setNameFilter={setNameFilter}
//           statusFilter={statusFilter}
//           setStatusFilter={setStatusFilter}
//         /> */}
//         {error && <div className={styles.errorMessage}>{error}</div>}

//         <div className={styles.list}>
//           {characters.map((character, i) => {
//             return i === characters.length - 1 &&
//               lastPage &&
//               page !== lastPage ? (
//               <div
//                 key={`${character.id} - ${character.name}`}
//                 ref={setLastElement}
//                 className={styles.item}
//               >
//                 <Card character={character} />
//               </div>
//             ) : (
//               <div
//                 key={`${character.id} - ${character.name}`}
//                 className={styles.item}
//               >
//                 <Card character={character} />
//               </div>
//             );
//           })}
//         </div>
//         <ScrollTop target="parent" threshold={100} icon="pi pi-arrow-up" />
//       </ScrollPanel>
//     </div>
//   );
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // const { name, status, page } = context.query;
//   // let pageNum = page ? parseInt(page as string) : 1;
//   // let nameFilter = name ? (name as string) : "";
//   // let statusFilter = status ? (status as string) : "";
//   // let filters = `?page=${pageNum}`;

//   // if (nameFilter.length && nameFilter.trim().length === 0) {
//   //   filters = filters + `&name=${nameFilter}`;
//   // }
//   // if (statusFilter.length && statusFilter.trim().length === 0) {
//   //   //   filters = filters + `&status=${statusFilter}`;
//   // }

//   // let characters = null;

//   // const response = await instance.get(`character?page=${pageNum}`);
//   // const data = await response.data;
//   let characters = null;
//   let page = 1;
//   if (context.query.page) {
//     page = parseInt(context.query.page as string);
//   }

//   const response = await instance.get(`character?page=${page}`);

//   const data = await response.data;

// const simplyfiedCharacterList = data.results.map(
//   (character: ICharacterData) => {
//     return {
//       id: character.id,
//       name: character.name,
//       image: character.image,
//       gender: character.gender,
//       species: character.species,
//       status: character.status,
//       episodes: character.episode.length,
//     };
//   }
// );

// characters = {
//   info: data.info,
//   results: simplyfiedCharacterList,
// };

// return {
//   props: {
//     data: characters,
//   },
// };
// };

// export default Home;

import type { GetServerSideProps } from "next";
import styles from "../styles/list.module.scss";
import { useEffect, useRef, useState } from "react";
import { ScrollTop } from "primereact/scrolltop";
import { ScrollPanel } from "primereact/scrollpanel";
import { useRouter } from "next/router";
import { ICharacter, ICharacterData, ICharactersData } from "../types/types";
import Card from "../components/Characters/CharacterCard";
import instance from "../api/instance";

interface IList {
  data: ICharactersData;
}

function Home({ data }: IList) {
  const router = useRouter();
  const [characters, setCharacters] = useState<ICharacter[] | []>([]);
  const [newCharacters, setnewCharacters] = useState<ICharacter[] | []>([]);
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
        router.push(`/?page=${nextPage}`);
      }
    });
  }, [page, router]);

  useEffect(() => {
    if (!data) {
      setError("There is nothing here");
    }
    if (data) {
      setLastPage(data.info.pages);
      setnewCharacters(data.results);
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
    if (newCharacters.length) {
      const newLocationsData = [...characters, ...newCharacters];

      setCharacters(newLocationsData);
      setnewCharacters([]);
    }
  }, [characters, newCharacters]);

  return (
    <div className={styles.listContainer}>
      <ScrollPanel style={{ width: "98vw", height: "92vh" }}>
        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.list}>
          {characters &&
            characters.map((character, i) => {
              return i === characters.length - 1 &&
                lastPage &&
                page !== lastPage ? (
                <div
                  key={`${character.id} - ${character.name}`}
                  ref={setLastElement}
                  className={styles.item}
                >
                  <Card character={character} />
                </div>
              ) : (
                <div
                  key={`${character.id} - ${character.name}`}
                  className={styles.item}
                >
                  <Card character={character} />
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
  let characters = null;
  if (context.query.page) {
    page = parseInt(context.query.page as string);
  }

  await instance
    .get(`character?page=${page}`)
    .then((data) => {
      const simplyfiedCharacterList = data.data.results.map(
        (character: ICharacterData) => {
          return {
            id: character.id,
            name: character.name,
            image: character.image,
            gender: character.gender,
            species: character.species,
            status: character.status,
            episodes: character.episode.length,
          };
        }
      );

      characters = {
        info: data.data.info,
        results: simplyfiedCharacterList,
      };
    })
    .catch(() => {
      characters = null;
    });

  return {
    props: {
      data: characters,
    },
  };
};

export default Home;
