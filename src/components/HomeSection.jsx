import React, { useState, useEffect, useRef } from "react";
import Glider from "react-glider";
import "../styles/HomeSection.scss";
import { IMAGE_BASE } from "../constants";
import { createObserver } from "../utils/lazy-load";
import { Link } from "react-router-dom";

const SectionItem = ({ observer, item }) => {
  const itemRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  function onLoad() {
    setLoaded(true);
  }

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
    <Link
      ref={itemRef}
      to={`/movie/${encodeURI(item.title || item.name)}/${item.id}`}
      className={`glider-slide section-item`}
    >
      <div className="item-wrapper">
        {!loaded && <div className="shimmer"></div>}
        <img
          style={{ display: loaded ? "block" : "none" }}
          onLoad={onLoad}
          data-src={IMAGE_BASE.SMALL + item.poster_path}
          alt={item.title || item.name}
        />
        <p>{item.title || item.name}</p>
      </div>
    </Link>
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
