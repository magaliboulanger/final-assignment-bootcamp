import { useState, useEffect } from "react";
import ComicsListComponent from "./ComicsListComponent";
import { getComicsByTitle, getComicsByCharacter } from "../ApiFetcher";
import { useLocation } from "react-router-dom";

export const SearchResult = ({ result, setComics, handleSave, isSaved }) => {
  const [isStarred, setIsStarred] = useState(isSaved(result.id));
  const [showComicsList, setComicsListShown] = useState(false);
  const [comicsResults, setComicsResults] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const comicParam = params.getAll("comic");

  const characterId = result.id;

  const toggleStar = () => {
    handleSave(result.id);
    setIsStarred(!isStarred);
  };

  const toggleShowList = async () => {
    if (!showComicsList && comicsResults.length == 0) {
      try {
        const response = await getComicsByCharacter(characterId);
        const data = await response.json();
        setComicsResults(data.data.results);
        setComics(data.data.results);
      } catch (e) {
        console.log(e);
      }
    }
    setComicsListShown(!showComicsList);
  };

  return (
    <div className="search-result">
      <button
        className={`favorite-button ${isStarred ? "active" : ""}`}
        onClick={toggleStar}
      >
        {isStarred ? (
          <span className="star white card-star">&#9733;</span>
        ) : (
          <span className="star white card-star">&#9734;</span>
        )}
      </button>
      <img
        className="full-img"
        src={result.thumbnail.path + "." + result.thumbnail.extension}
      ></img>
      <div
        className="card"
        onClick={() => {
          toggleShowList();
        }}
      >
        <p className="character-name">{result.name}</p>
        <div className={showComicsList ? "overlay" : ""}>
          {showComicsList ? (
            <div className="comics-pop-up">
              <ComicsListComponent
                closeList={toggleShowList}
                results={comicsResults}
                name={result.name}
                handleSave={handleSave}
                isSaved={isSaved}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
