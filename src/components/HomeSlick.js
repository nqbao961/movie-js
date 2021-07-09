import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Button from "./Button";
import "../styles/HomeSlick.scss";
import axios from "axios";
import { IMAGE_BASE } from "../constants";

export default function HomeSlick() {
  const [list, setList] = useState(null);
  const [slickList, setSlickList] = useState([]);

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
          <div key={list[index].id} className="item">
            <div className="item-wrapper">
              <h3>{list[index].title || list[index].name}</h3>
              <div className="button-wrapper">
                <Button type="primary">Watch Now</Button>
                <Button type="border">Watch Trailer</Button>
              </div>
            </div>
            <img
              src={IMAGE_BASE.ORIGINAL + list[index].backdrop_path}
              alt={list[index].title || list[index].name}
            />
          </div>
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
