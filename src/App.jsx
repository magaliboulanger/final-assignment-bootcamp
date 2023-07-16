import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList.jsx";
import logo from "./resources/images/Marvel_Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

function App() {
  const [results, setResults] = useState([]);
  const [isStarred, setIsStarred] = useState(false);

  const toggleStar = () => {
    setIsStarred(!isStarred);
  };

  return (
    <div className="App">
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
      <div>
        {results && results.length > 0 && (
          <SearchResultsList results={results} />
        )}
      </div>
    </div>
  );
}

export default App;
