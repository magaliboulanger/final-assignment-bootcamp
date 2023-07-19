import "./SearchResults.css";

export const SearchResult = ({ result }) => {


  return (
    <div
      className="search-result"
      onClick={(e) => {
        openCharacterPage(e);
      }}
    > 
      <img className="character-img" src={result.thumbnail.path + "." + result.thumbnail.extension}></img>
      <p className="character-name">{result.name}</p>
    </div>
  );
};
