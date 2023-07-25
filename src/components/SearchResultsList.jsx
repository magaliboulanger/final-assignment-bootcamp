import { SearchResult } from "./SearchResults";

export const SearchResultsList = ({ results, setComics }) => {
  return (
    <div className="results-list main-content">
      {results && results.length > 0 ? (
        results.map((result) => {
          return (
            <SearchResult
              key={result.id}
              result={result}
              setComics={setComics}
            />
          );
        })
      ) : (
        <p>No hay resultados</p>
      )}
    </div>
  );
};
