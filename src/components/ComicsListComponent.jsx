import ComicListItem from "./ComicListItem";
import { useNavigate } from "react-router-dom";

export default function ComicsListComponent({ name, results, closeList }) {
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
        {results.map((value) => {
          console.log(value);
          return (
            <ComicListItem
              id={value.id}
              key={value.id}
              title={value.title}
              description={value.description}
              image={value.thumbnail}
            />
          );
        })}
      </div>
    </div>
  );
}