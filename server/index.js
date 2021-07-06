import express from "express";
import path from "path";
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";
import axios from "axios";

const cache = require("memory-cache");
const critical = require("critical");

const API_KEY = "1112710f884452a17dad4e6798af5e9e";

const app = express();
const port = process.env.PORT || 3001;

critical.generate({
  /* The path of the Webpack bundle */
  base: path.resolve("./build/"),
  src: "index.html",
  target: "index.html",
  inline: true,
  extract: true,
  width: 1400,
  height: 900,

  /* Ensure that bundled JS file is called */
  penthouse: {
    blockJSRequests: false,
  },
});

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

function updateCache() {
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

updateCache();
setInterval(updateCache, 15 * 1000 * 60);

app.get("/", (req, res) => {
  const root = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve("./build/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${root}</div>`)
    );
  });
});

app.get("/api/trending", (req, res) => {
  if (cache.get("trendingList")) {
    res.send(cache.get("trendingList"));
  } else {
    getTrending()
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
});

app.get("/api/marvel", (req, res) => {
  if (cache.get("marvelList")) {
    res.send(cache.get("marvelList"));
  } else {
    getMarvelMovies()
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
});

app.use(express.static("build"));

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
