import "./SearchResults.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import ComicsListComponent from "../comic-list/ComicsListComponent";

export const SearchResult = ({ result }) => {
  const [isStarred, setIsStarred] = useState(false);
  const [showComicsList, setComicsListShown] = useState(false);
  const [comicsResults, setComicsResults] = useState([]);
  const [comicsToSearch, setComicsToSearch] = useState([]);

  const toggleStar = () => {
    setIsStarred(!isStarred);
  };

  useEffect(()=>{
  const setComicsList = async (comics) => {
    let urls = [];
    for (var i = 0; i < comics.length; i++) {
      urls.push(comics[i].resourceURI);
    }
    const fetchResults = [];
    for (const url of urls) {
      try {
        const response = await fetch(
          url +
            "?apikey=" +
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
        );
        if (response.ok) {
          const jsonData = await response.json();
          fetchResults.push(jsonData.data.results);
        } else {
          console.error(`Error fetching data from ${url}`);
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    }
    console.log(fetchResults);
    setComicsResults(fetchResults);
    setComicsListShown(true);
  };},[comicsToSearch]);

  return (
    <div
      className="search-result"
      onClick={() => {
        if (result.comics.items.length > 0)
          setComicsToSearch(result.comics.items);
      }}
    >
      <button className="star-container save-character" onClick={toggleStar}>
        {isStarred ? (
          <FontAwesomeIcon className="white-star" icon={solidStar} />
        ) : (
          <FontAwesomeIcon className="white-star" icon={emptyStar} />
        )}
      </button>
      <img
        className="character-img"
        src={result.thumbnail.path + "." + result.thumbnail.extension}
      ></img>
      <p className="character-name">{result.name}</p>
      <ComicsListComponent
        trigger={showComicsList}
        results={comicsResults}
      ></ComicsListComponent>
    </div>
  );
};
