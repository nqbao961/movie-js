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

async function getAnimeMovies() {
  const res = await axios.get(
    "https://api.themoviedb.org/3/keyword/210024/movies",
    {
      params: {
        api_key: API_KEY,
      },
    }
  );
  return res;
}

async function getDisneyMovies() {
  const res = await axios.get(
    "https://api.themoviedb.org/3/keyword/277578/movies",
    {
      params: {
        api_key: API_KEY,
      },
    }
  );
  return res;
}

async function getHorrorMovies() {
  const res = await axios.get(
    "https://api.themoviedb.org/3/keyword/8087/movies",
    {
      params: {
        api_key: API_KEY,
      },
    }
  );
  return res;
}

async function getMovieDetail(id) {
  const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return res;
}

export default {
  getTrending,
  getMarvelMovies,
  getAnimeMovies,
  getDisneyMovies,
  getHorrorMovies,
  getMovieDetail,
};
