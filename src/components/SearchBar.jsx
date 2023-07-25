import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../resources/images/Marvel_Logo.png";
import { getCharacters } from "../ApiFetcher";

function SearchBar() {
  const [isStarred, setIsStarred] = useState(window.location.href.includes("favorites"));
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsStarred(window.location.href.includes("favorites"));
    
  });

  const toggleStar = () => {
    if (!isStarred) navigate("/favorites");
    else navigate("/");
    setIsStarred(!isStarred);
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input != "") {
      navigate(`/characters/?name=${input}`);
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
