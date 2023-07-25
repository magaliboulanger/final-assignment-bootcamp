import { useState } from "react";
import { SearchResultsList } from "../components/SearchResultsList";

export default function Home({ setComics }) {
  const [randomCharacters, setRandomCharacters] = useState([]);
  window.onload = () => {
    const randomLetter = String.fromCharCode(Math.floor(Math.random() * 256));
    fetch(
      "https://gateway.marvel.com:443/v1/public/characters?limit=20&nameStartsWith=" +
        randomLetter +
        "&apikey=" +
        import.meta.env.VITE_REACT_APP_MARVEL_API_KEY +
        "&hash=" +
        import.meta.env.VITE_REACT_APP_API_HASH +
        "&ts=" +
        import.meta.env.VITE_API_TS,
      {
        method: "GET",
        withCredentials: true,
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.data.results.length == 0) location.reload();
        setRandomCharacters(json.data.results);
      });
  };

  return (
    <div>
      <SearchResultsList results={randomCharacters} setComics={setComics} />
    </div>
  );
}
