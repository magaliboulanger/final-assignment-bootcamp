import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchResultsList } from "../components/SearchResultsList";
import { getCharacters } from "../ApiFetcher";

export default function Home({ setResults, setComics, handleSave, isSaved }) {
  const [randomCharacters, setRandomCharacters] = useState([]);
  const randomString = [
    "spi",
    "lo",
    "po",
    "pa",
    "pe",
    "yo",
    "mr",
    "me",
    "ma",
    "mi",
    "ra",
    "re",
    "se",
    "sa",
    "ca",
    "ce",
    "wa",
    "we",
    "e",
    "o",
  ];
  const nav = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCharacters(
          randomString[Math.floor(Math.random() * randomString.length)]
        );
        const data = await response.json();
        if (data.data.results.length == 0) nav("/");
        setRandomCharacters(data.data.results);
        setResults(data.data.results);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <SearchResultsList
        setResults={setResults}
        results={randomCharacters}
        setComics={setComics}
        handleSave={handleSave}
        isSaved={isSaved}
      />
    </div>
  );
}
