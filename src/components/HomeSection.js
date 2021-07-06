import React, { useState, useEffect } from "react";
import Glider from "react-glider";
import "../styles/HomeSection.scss";
import { IMAGE_BASE } from "../constants";

const SectionItem = ({ item }) => (
  <div className={`glider-slide section-item`}>
    <div className="item-wrapper">
      <img
        src={IMAGE_BASE.SMALL + item.poster_path}
        alt={item.title || item.name}
      />
      <p>{item.title || item.name}</p>
    </div>
  </div>
);

export default function HomeSection({ title, movieList }) {
  const [gliderList, setGliderList] = useState([]);

  useEffect(() => {
    if (movieList) {
      setGliderList(movieList.map((item) => <SectionItem item={item} />));
    }
  }, [movieList]);

  return (
    <div className="homeSection container">
      <h2>{title}</h2>
      {gliderList.length > 0 && (
        <Glider
          draggable
          hasArrows
          slidesToScroll={5}
          slidesToShow={5}
          className="gradient-outline"
        >
          {gliderList}
        </Glider>
      )}
    </div>
  );
}
