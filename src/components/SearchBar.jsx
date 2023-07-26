import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../resources/images/Marvel_Logo.png";
import { getCharacters } from "../ApiFetcher";

function SearchBar({ setResults }) {
  const [isStarred, setIsStarred] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsStarred(window.location.href.includes("favorites"));
  }, []);

  const toggleStar = () => {
    if (!isStarred) navigate("/favorites");
    else navigate("/");
    setIsStarred(!isStarred);
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && input != "") {
      try {
        const response = await getCharacters(input);
        const data = await response.json();
        await setResults(data.data.results);
      } catch (e) {
        console.log(e);
      }
      navigate(`/characters/?character=${input}`);
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
