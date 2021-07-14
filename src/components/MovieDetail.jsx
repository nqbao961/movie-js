import React, { useState, useEffect } from "react";
import "../styles/MovieDetail.scss";
import Button from "./Button";
import { IMAGE_BASE } from "../constants";
import axios from "axios";

export default function MovieDetail({ id }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/movie/${id}`)
      .then((res) => {
        console.log(res.data);
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="movieDetail">
      {movie && (
        <div className="container">
          <div
            className="backdrop-wrapper"
            style={{
              backgroundImage: `url(${
                IMAGE_BASE.ORIGINAL + movie.backdrop_path
              })`,
            }}
          >
            <div className="info-wrapper wrapper">
              <h1 className="title">{movie.title || movie.name}</h1>
              <div className="info">
                <p>{movie.release_date}</p>
                <p>{movie.genres.map((item) => item.name).join("/")}</p>
              </div>
              <Button type="primary">Watch Now</Button>
            </div>
          </div>
          <div className="content-wrapper wrapper">
            <div className="description">{movie.overview}</div>
            <h3>Rate</h3>
            <p>{movie.vote_average}</p>
          </div>
        </div>
      )}
    </div>
  );
}
