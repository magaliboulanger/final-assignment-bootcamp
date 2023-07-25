import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Home from "./pages/Home";
import ComicPage from "./pages/ComicPage";
import SearchBar from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";

function App() {
  const [results, setResults] = useState([]);
  const [comics, setComics] = useState([]);

  //localStorage.clear();
  const isSaved = (id) => {
    let favs = JSON.parse(localStorage.getItem("Favorites"));
    if (favs == null) {
      return false;
    }
    const saved = favs.filter((e) => e.id === id);
    return saved.length > 0;
  };

  const removeSaved = (id) => {
    let favs = JSON.parse(localStorage.getItem("Favorites"));
    for (let i = 0; i < favs.length; i++) {
      if (favs[i].id === id) {
        delete favs[i];
        break;
      }
      localStorage.setItem("Favorites", JSON.stringify(favs));
    }
  };

  const handleSave = (id) => {
    const item = results.filter((result) => result.id === id)[0];
    if (JSON.parse(localStorage.getItem("Favorites")) != null && isSaved(id)) {
      removeSaved(id);
      console.log("elimino");
    } else {
      let favs = JSON.parse(localStorage.getItem("Favorites"));
      if (favs != null) favs.push(item);
      else favs = [item];
      localStorage.setItem("Favorites", JSON.stringify(favs));
      console.log("agrego");
    }
    console.log(JSON.parse(localStorage.getItem("Favorites")));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <SearchBar setResults={setResults} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setResults={setResults}
                setComics={setComics}
                handleSave={handleSave}
                isSaved={isSaved}
              />
            }
          />
          <Route
            path="/characters"
            element={
              <SearchResultsList
                setResults={setResults}
                results={results}
                setComics={setComics}
                handleSave={handleSave}
                isSaved={isSaved}
              />
            }
          />
          <Route
            path="/character/:key/comics"
            element={<ComicPage comicData={comics} />}
          />
          <Route
            path="/favorites"
            element={
              <SearchResultsList
                setResults={setResults}
                results={JSON.parse(localStorage.getItem("Favorites"))}
                setComics={setComics}
                handleSave={handleSave}
                isSaved={isSaved}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
