import "./SearchResults.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

export const SearchResult = ({ result }) => {
  const [isStarred, setIsStarred] = useState(false);

  const toggleStar = () => {
    setIsStarred(!isStarred);
  };
  return (
    <div
      className="search-result"
      onClick={(e) => {
        openCharacterPage(e);
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
    </div>
  );
};
