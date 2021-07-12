import React, { useState, useEffect, useRef } from "react";
import Glider from "react-glider";
import "../styles/HomeSection.scss";
import { IMAGE_BASE } from "../constants";
import { createObserver } from "../utils/lazy-load";

const SectionItem = ({ observer, item }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    const itemElement = itemRef.current;

    if (observer !== null) {
      observer.observe(itemElement);
    }

    return () => {
      if (observer !== null) {
        observer.unobserve(itemElement);
      }
    };
  }, [observer]);
  return (
    <div ref={itemRef} className={`glider-slide section-item`}>
      <div className="item-wrapper">
        <img
          data-src={IMAGE_BASE.SMALL + item.poster_path}
          alt={item.title || item.name}
        />
        <p>{item.title || item.name}</p>
      </div>
    </div>
  );
};

export default function HomeSection({ title, movieList }) {
  const [gliderList, setGliderList] = useState([]);
  const [observer, setObserver] = useState(null);

  useEffect(() => {
    const itemObserver = createObserver();
    setObserver(itemObserver);

    return () => {
      itemObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (movieList) {
      setGliderList(
        movieList.map((item) => (
          <SectionItem key={item.id} observer={observer} item={item} />
        ))
      );
    }
  }, [movieList]);

  return (
    <div className="homeSection container">
      <h2>{title}</h2>
      {gliderList.length > 0 ? (
        <Glider
          draggable
          hasArrows
          slidesToScroll={5}
          slidesToShow={5}
          className="gradient-outline"
        >
          {gliderList}
        </Glider>
      ) : (
        <div className="place-holder"></div>
      )}
    </div>
  );
}
