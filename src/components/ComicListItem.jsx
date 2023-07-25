import { useState } from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
// import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

export default function ComicListItem({ id, title, description, image }) {
  const [isStarred, setIsStarred] = useState(false);

  const toggleStar = () => {
    setIsStarred(!isStarred);
  };

  return (
    <div className="comic-result">
      <div className="image-wrapper">
        <img className="item-image" src={image.path + "." + image.extension} />
      </div>
      <div className="text">
        <div>
          <Link className="item-title" to={`/character/${id}/comics`}>
            {title}
          </Link>
          <button className="star-container" onClick={toggleStar}>
            {/* {isStarred ? (
              <FontAwesomeIcon className="star" icon={solidStar} />
            ) : (
              <FontAwesomeIcon className="star" icon={emptyStar} />
            )} */}
          </button>
        </div>

        <p className="item-description">{description && description!=""?description:"No hay una descripción."}</p>
      </div>
    </div>
  );
}
