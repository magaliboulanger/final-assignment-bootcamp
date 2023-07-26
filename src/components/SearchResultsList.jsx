import { SearchResult } from "./SearchResult";
import { useLocation } from "react-router-dom";
import { useState, useEffect} from "react";
import { getCharacters } from "../ApiFetcher";

export const SearchResultsList = ({
  setResults,
  results,
  setComics,
  handleSave,
  isSaved,
}) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const nameParam = params.getAll("character");
  
  const getData = async () => {
    try {
      let out = [];
      for (let i = 0; i < nameParam.length; i++) {
        const response = await getCharacters(nameParam[i]);
        const data = await response.json();
        out = out.concat(data.data.results);
      }
      await setResults(out);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="results-list main-content">
      {results && results.length > 0 ? (
        results.map((result) => {
          return (
            <SearchResult
              key={result.id}
              result={result}
              setComics={setComics}
              handleSave={handleSave}
              isSaved={isSaved}
            />
          );
        })
      ) : (
        <p>No hay resultados</p>
      )}
    </div>
  );
};
