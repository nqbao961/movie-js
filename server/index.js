import express from "express";
import path from "path";
import { promises as fs } from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";
import { getTrending, getMarvelMovies } from "./utils/api";
import { updateCache } from "./utils/cache";
import { createCriticalCss } from "./utils/critical";

const cache = require("memory-cache");

const app = express();
const port = process.env.PORT || 3001;

updateCache(cache);
setInterval(() => {
  updateCache(cache);
}, 15 * 1000 * 60);

(async () => {
  await fs
    .readFile(path.resolve("./build/index.html"), "utf8")
    .then(async (html) => {
      await createCriticalCss(html)
        .then((newHtml) => {
          fs.writeFile(path.resolve("./build/index.html"), newHtml, (err) => {
            if (err) throw err;
          });
        })
        .catch((err) => console.error("Something went wrong:", err));
    })
    .catch((err) => console.error("Something went wrong:", err));
})();

app.get("/", async (req, res) => {
  const root = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve("./build/index.html");
  await fs
    .readFile(indexFile, "utf8")
    .then((data) => {
      return res.send(
        data.replace('<div id="root"></div>', `<div id="root">${root}</div>`)
      );
    })
    .catch((err) => {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
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
