import { useState } from "react";
import { Link } from "react-router-dom";

export default function ComicListItem({ id, title, description, image, handleSave,isSaved }) {
  const [isStarred, setIsStarred] = useState(isSaved(id));

  const toggleStar = () => {
    //TO DO : Save favorite comics
    // if (!isStarred) {
    //   handleSave(id);
    // }
    setIsStarred(!isStarred);
  };

  return (
    <div className="comic-result">
      <div className="image-wrapper">
        <img className="item-image" src={image.path + "." + image.extension} />
      </div>
      <div className="text">
        <div className="title">
          <Link className="item-title" to={`/character/${id}/comics`}>
            {title}
          </Link>
          <button
            className={`favorite-button ${isStarred ? "active" : ""}`}
            onClick={toggleStar}
          >
            {isStarred ? (
              <span className="star">&#9733;</span>
            ) : (
              <span className="star">&#9734;</span>
            )}
          </button>
        </div>

        <p className="item-description">{description && description!=""?description:"No hay una descripción."}</p>
      </div>
    </div>
  );
}
