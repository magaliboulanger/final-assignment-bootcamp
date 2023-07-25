import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Home from "./pages/Home";
import ComicPage from "./pages/ComicPage";
import SearchBar from "./components/SearchBar";
import { SearchResultsList} from "./components/SearchResultsList";

function App() {
  const [results, setResults] = useState([]);
  const [comics, setComics] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <SearchBar setResults={setResults} />
        <Routes>
          <Route path="/" element={<Home setComics={setComics} />} />
          <Route
            path="/characters"
            element={
              <SearchResultsList results={results} setComics={setComics} />
            }
          />
          <Route
            path="/character/:key/comics"
            element={<ComicPage comicData={comics} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
