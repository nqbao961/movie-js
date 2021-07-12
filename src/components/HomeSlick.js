import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import SlickItem from "./SlickItem";
import "../styles/HomeSlick.scss";
import axios from "axios";
import { createObserver } from "../utils/lazy-load";

export default function HomeSlick() {
  const [list, setList] = useState(null);
  const [slickList, setSlickList] = useState([]);
  const [observer, setObserver] = useState(null);

  useEffect(() => {
    const itemObserver = createObserver();
    setObserver(itemObserver);

    return () => {
      itemObserver.disconnect();
    };
  }, []);

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    axios
      .get("/api/trending")
      .then((res) => setList(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (list) {
      setSlickList(
        [0, 1, 2].map((index) => (
          <SlickItem
            key={list[index].id}
            observer={observer}
            title={list[index].title}
            name={list[index].name}
            src={list[index].backdrop_path}
          />
        ))
      );
    }
  }, [list]);

  return slickList.length === 0 ? (
    <div className="homeSlick container place-holder"></div>
  ) : (
    <Slider {...settings} className="homeSlick container">
      {slickList}
    </Slider>
  );
}
