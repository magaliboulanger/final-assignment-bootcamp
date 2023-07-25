import { useParams } from "react-router-dom";
import React, { useState } from "react";
import "../App.css";

export default function ComicPage(comicData) {
  const { key } = useParams();
  const row = comicData.comicData.filter((reg) => reg.id == key)[0];

  const filterByRole = (role) => {
    const creators = row.creators.items.filter((reg) => reg.role == role);
    return creators.length == 0
      ? "-"
      : creators.map((creator, index) => (
          <React.Fragment key={index}>
            {index > 0 && ", "}
            {creator.name}
          </React.Fragment>
        ));
  };

  const formattedDate = row.dates
    .filter((item) => item.type === "digitalPurchaseDate")
    .map((item) => {
      const date = new Date(item.date);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString().slice(-2);
      return `${day}/${month}/${year}`;
    });

  return (
    <div className="main-content">
      <div className="comic-detail">
        <img
          className="comic-img"
          src={row.thumbnail.path + "." + row.thumbnail.extension}
        ></img>
      </div>
      <div className="comic-detail">
        <h1 className="title">{row.title}</h1>
        <div>
          <p>Published: {formattedDate != "" ? formattedDate : "-"}</p>
          <p>Writer/s: {filterByRole("writer")}</p>
          <p>Penciler/s: {filterByRole("penciler")}</p>
          <p>Cover artist/s: {filterByRole("penciller (cover)")}</p>
        </div>
        <p>{row.description}</p>
      </div>
    </div>
  );
}
