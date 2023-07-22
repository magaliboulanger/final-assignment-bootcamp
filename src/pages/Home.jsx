import { useState } from "react";
import logo from "../resources/images/Marvel_Logo.png";
import SearchBar from "../components/search-bar/SearchBar";
import { SearchResultsList } from "../components/search-results-list/SearchResultsList.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import "./Home.css";
import ComicsListComponent from "../components/comic-list/ComicsListComponent";

export default function Home() {
  const [results, setResults] = useState([]);
  const [isStarred, setIsStarred] = useState(false);
  const [showComicsList, setComicsListShown] = useState(false);

  const toggleStar = () => {
    setIsStarred(!isStarred);
  };

  const toggleComicsList = () => {
    setComicsListShown(!showComicsList);
  };

  return (
    <div>
      <header>
        <nav className="nav-bar">
          <img className="logo" src={logo} alt="Marvel Logo"></img>
          <div className="search-bar-container">
            <SearchBar setResults={setResults} />
          </div>
          <button className="star-container" onClick={toggleStar}>
            {isStarred ? (
              <FontAwesomeIcon className="star" icon={solidStar} />
            ) : (
              <FontAwesomeIcon className="star" icon={emptyStar} />
            )}
          </button>
        </nav>
      </header>
      <div className="main-content">
        {results && results.length > 0 && (
          <SearchResultsList results={results} toggle={toggleComicsList} />
        )}
      </div>
    </div>
  );
}
