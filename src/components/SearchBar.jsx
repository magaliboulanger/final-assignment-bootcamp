import { useState, useEffect } from "react";
import "./SearchBar.css";
import { BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";

function SearchBar({ setResults }) {
  const [input, setInput] = useState("");

  const fetchData = (input) => {
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
        //console.log(json.data.results);
        // const results = json.data.results.filter((result) => {
        //    return result.name && result.title;
        // });
        setResults(json.data.results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchData(input);
    }  
  };

  return (
    <div className="input-wrapper">
      <input
        placeholder="🔍 Buscar"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
export default SearchBar;
