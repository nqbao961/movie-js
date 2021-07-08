import { getTrending, getMarvelMovies } from "../utils/api";

function updateCache(cache) {
  getTrending()
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

  getMarvelMovies()
    .then((response) => {
      cache.put("marvelList", response.data);
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export { updateCache };
