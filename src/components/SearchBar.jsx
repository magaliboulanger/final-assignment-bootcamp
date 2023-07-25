import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../resources/images/Marvel_Logo.png";

function SearchBar({ setResults }) {
  const [isStarred, setIsStarred] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const getCharacters = (input) => {
    fetch(
      "https://gateway.marvel.com:443/v1/public/characters?apikey=" +
        import.meta.env.VITE_REACT_APP_MARVEL_API_KEY +
        "&hash=" +
        import.meta.env.VITE_REACT_APP_API_HASH +
        "&ts=" +
        import.meta.env.VITE_API_TS +
        "&nameStartsWith=" +
        input,
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
        setResults(json.data.results);
        navigate(`/characters/?name=${input}`);
      });
  };
  const toggleStar = () => {
    setIsStarred(!isStarred);
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input != "") {
      getCharacters(input);
    }
  };
  const openHome = () => {
    navigate(`/`);
  };

  return (
    <div>
      <header>
        <nav className="nav-bar">
          <img
            onClick={openHome}
            className="logo"
            src={logo}
            alt="Marvel Logo"
          ></img>
          <div className="search-bar-container">
            <div className="input-wrapper">
              <input
                placeholder="Buscar"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </div>
          </div>
          <button
            className={`favorite-button ${isStarred ? "active" : ""}`}
            onClick={toggleStar}
          >
            {isStarred ? (
              <span className="star">&#9733;</span>
            ) : (
              <span className="star">&#9734;</span>
            )}
          </button>
        </nav>
      </header>
    </div>
  );
}
export default SearchBar;
