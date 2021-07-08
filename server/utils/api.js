import axios from "axios";
import { API_KEY } from "../constants/index";

async function getTrending() {
  const res = await axios.get("https://api.themoviedb.org/3/trending/all/day", {
    params: {
      api_key: API_KEY,
    },
  });
  return res;
}

async function getMarvelMovies() {
  const res = await axios.get(
    "https://api.themoviedb.org/3/keyword/180547/movies",
    {
      params: {
        api_key: API_KEY,
      },
    }
  );
  return res;
}

export { getTrending, getMarvelMovies };
