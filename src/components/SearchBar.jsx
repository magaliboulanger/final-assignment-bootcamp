import { useState } from "react";
import "./SearchBar.css";

function SearchBar(setResults) {
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
          "Accept": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleClick = () => {
    fetchData(input);
  };

  return (
    <div className="input-wrapper">
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button onClick={()=>handleClick()}>Buscar</button>
    </div>
  );
}
export default SearchBar;
