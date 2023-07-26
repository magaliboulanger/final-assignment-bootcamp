import ComicListItem from "./ComicListItem";
import { useNavigate } from "react-router-dom";

export default function ComicsListComponent({
  name,
  results,
  closeList,
  handleSave,
  isSaved,
}) {
  return (
    <div className="comics-list">
      <button
        className="close-btn"
        onClick={() => {
          closeList();
        }}
      ></button>
      <div className="modal-content">
        <div className="title">
          <h2>{name}</h2>
        </div>
        {results && results.length == 0
          ? "No se registran comics."
          : results.map((value) => {
              return (
                <ComicListItem
                  id={value.id}
                  key={value.id}
                  title={value.title}
                  description={value.description}
                  image={value.thumbnail}
                  handleSave={handleSave}
                  isSaved={isSaved}
                />
              );
            })}
      </div>
    </div>
  );
}
