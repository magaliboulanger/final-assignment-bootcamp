import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
// import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import ComicsListComponent from "./ComicsListComponent";

export const SearchResult = ({ result, setComics }) => {
  const [isStarred, setIsStarred] = useState(false);
  const [showComicsList, setComicsListShown] = useState(false);
  const [comicsResults, setComicsResults] = useState([]);
  const characterId = result.id;

  const toggleStar = () => {
    setIsStarred(!isStarred);
  };

  const getComics = async () => {
    fetch(
      "https://gateway.marvel.com:443/v1/public/characters/" +
        characterId +
        "/comics?orderBy=onsaleDate&apikey=" +
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
        setComicsResults(json.data.results);
        setComics(json.data.results);
        console.log(json.data.results);
      });
  };

  const toggleShowList = async () => {
    if (!showComicsList && comicsResults.length == 0) {
      await getComics();
    }
    setComicsListShown(!showComicsList);
  };

  return (
    <div
      className="search-result"
      onClick={() => {
        toggleShowList();
      }}
    >
      {/* <button className="star-container save-character" onClick={toggleStar}>
        {isStarred ? (
          <FontAwesomeIcon className="white-star" icon={solidStar} />
        ) : (
          <FontAwesomeIcon className="white-star" icon={emptyStar} />
        )}
      </button> */}
      <img
        className="full-img"
        src={result.thumbnail.path + "." + result.thumbnail.extension}
      ></img>
      <p className="character-name">{result.name}</p>
      <div className={showComicsList ? "overlay" : ""}>
        {showComicsList ? (
          <div className="comics-pop-up">
            <ComicsListComponent
              closeList={toggleShowList}
              results={comicsResults}
              name={result.name}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
