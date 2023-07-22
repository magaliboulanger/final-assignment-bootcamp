import { SearchResult } from "../search-results/SearchResults";
import "./SearchResultsList.css";

export const SearchResultsList = ({ results, toggle }) => {
  return (
    <div className="results-list">
      {results.map((name, title) => {
        return <SearchResult result={name} key={title} toggle={toggle} />;
      })}
    </div>
  );
};
