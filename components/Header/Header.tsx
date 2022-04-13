import { useState } from "react";
import { useRouter } from "next/router";

export function Header() {
  const router = useRouter();
  const [showNav, setShowNav] = useState(false);

  function viewCharacterList() {
    setShowNav(false);
    router.push("/");
  }

  function viewLocationList() {
    router.push("/location");
    setShowNav(false);
  }

  function viewEpisodeList() {
    router.push("/episode");
    setShowNav(false);
  }

  return (
    <header className="fixed top-0 z-10 w-screen flex flex-wrap items-center bg-white p-0.5 text-container rounded-b">
      <div
        id="logo"
        className="inline-flex items-center p-0 mr-4 font-serif font-bold lg:text-xl"
      >
        <button onClick={viewCharacterList}>
          <img src="/logo3.png" alt="logo" className="h-12 p-1 pl-2" />
        </button>
      </div>
      <button
        onClick={() => setShowNav(!showNav)}
        type="button"
        className="inline-flex p-2 ml-auto mr-4 text-black hover:text-gray-300 focus:text-gray-700 focus:outline-none lg:hidden"
      >
        <svg
          className="w-6 h-6 fill-current"
          viewBox="0 -53 384 384"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
          <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
          <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
        </svg>
      </button>

      <div className="flex-grow w-full lg:inline-flex lg:flex-grow lg:w-auto">
        <div
          className={
            "lg:inline-flex lg:flex-row lg:ml-auto flex flex-col " +
            (showNav ? "" : "hidden")
          }
        >
          <button
            onClick={viewCharacterList}
            className={`${
              showNav && "animate-wiggle"
            } bg-white p-2 text-black rounded hover:bg-gray-100 hover:shadow font-semibold`}
            onAnimationEnd={() => setShowNav(false)}
          >
            Characters
          </button>

          <button
            onClick={viewLocationList}
            className={`${
              showNav && "animate-wiggle"
            } bg-white p-2 text-black rounded hover:bg-gray-100 hover:shadow font-semibold`}
            onAnimationEnd={() => setShowNav(false)}
          >
            Locations
          </button>

          <button
            onClick={viewEpisodeList}
            className={`${
              showNav && "animate-wiggle"
            } bg-white p-2 md:mr-4  text-black rounded hover:bg-gray-100 hover:shadow font-semibold`}
            onAnimationEnd={() => setShowNav(false)}
          >
            Episodes
          </button>
        </div>
      </div>
    </header>
  );
}
