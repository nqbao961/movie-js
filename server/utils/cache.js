import api from "../utils/api";

function updateCache(cache) {
  api
    .getTrending()
    .then((response) => {
      let newData = { ...response.data };
      // Shuffle movies
      newData.results.sort(function () {
        return 0.5 - Math.random();
      });
      cache.put("trendingList", newData);
    })
    .catch((error) => {
      throw new Error(error);
    });

  api
    .getMarvelMovies()
    .then((response) => {
      cache.put("marvelList", response.data);
    })
    .catch((error) => {
      throw new Error(error);
    });

  api
    .getAnimeMovies()
    .then((response) => {
      cache.put("animeList", response.data);
    })
    .catch((error) => {
      throw new Error(error);
    });

  api
    .getDisneyMovies()
    .then((response) => {
      cache.put("disneyList", response.data);
    })
    .catch((error) => {
      throw new Error(error);
    });

  api
    .getHorrorMovies()
    .then((response) => {
      cache.put("horrorList", response.data);
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export { updateCache };
