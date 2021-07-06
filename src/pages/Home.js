import React, { useState, useEffect } from "react";
import HomeSlick from "../components/HomeSlick";
import HomeSection from "../components/HomeSection";
import axios from "axios";

export default function Home() {
  const [trendingList, setTrendingList] = useState(null);
  const [marvelList, setMarvelList] = useState(null);

  useEffect(() => {
    axios
      .get("/api/trending")
      .then((res) => setTrendingList(res.data.results))
      .catch((err) => console.log(err));
    axios
      .get("/api/marvel")
      .then((res) => setMarvelList(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <HomeSlick />
      <HomeSection title="Trending" movieList={trendingList} />
      <HomeSection title="Marvel Movies" movieList={marvelList} />
    </div>
  );
}
