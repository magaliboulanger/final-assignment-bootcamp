import { SearchResult } from "./SearchResult";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
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
  const nameParam = params.get("name");

  const getData = async () => {
    try {
      const response = await getCharacters(nameParam);
      const data = await response.json();
      await setResults(data.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  },[nameParam]);

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
