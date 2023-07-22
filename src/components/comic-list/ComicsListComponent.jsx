import "./ComicsList.css";
import ComicListItem from "../comic-list-item/ComicListItem"
import { useState } from "react";
export default function ComicsListComponent({trigger, results}) {
  const [opened, setOpened]= useState(trigger);
  const closeList = () => {
    setOpened(false);
  };

  return opened ? (
    <div className="comics-list">
      <div className="modal-content">I'm the list</div>
      <button
        onClick={(e) => {
          closeList(e);
        }}
      />
      {results && results.length > 0 && <ComicListItem results={results} />}
    </div>
  ) : (
    ""
  );
}
