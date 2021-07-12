import React, { useState, useEffect } from "react";
import HomeSlick from "../components/HomeSlick";
import HomeSection from "../components/HomeSection";
import axios from "axios";

function getData(url, setCallback) {
  axios
    .get(url)
    .then((res) => setCallback(res.data.results))
    .catch((err) => console.log(err));
}

export default function Home() {
  const [trendingList, setTrendingList] = useState(null);
  const [marvelList, setMarvelList] = useState(null);
  const [animeList, setAnimeList] = useState(null);
  const [disneyList, setDisneyList] = useState(null);
  const [horrorList, setHorrorList] = useState(null);

  useEffect(() => {
    getData("/api/trending", setTrendingList);
    getData("/api/marvel", setMarvelList);
    getData("/api/anime", setAnimeList);
    getData("/api/disney", setDisneyList);
    getData("/api/horror", setHorrorList);
  }, []);

  return (
    <div>
      <HomeSlick />
      <HomeSection title="Trending" movieList={trendingList} />
      <HomeSection title="Marvel" movieList={marvelList} />
      <HomeSection title="Anime" movieList={animeList} />
      <HomeSection title="Disney" movieList={disneyList} />
      <HomeSection title="Horror" movieList={horrorList} />
    </div>
  );
}
