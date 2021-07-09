import path from "path";
import { promises as fs } from "fs";
import { CRITICAL_CLASSES } from "../constants";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function createCriticalCss(html) {
  let dom = new JSDOM(html);
  let critical = "";
  let inlineStyle = dom.window.document.createElement("style");
  let linkElements = dom.window.document.querySelectorAll("link");

  let styleLinks = Array.prototype.filter.call(
    linkElements,
    (element) => element.getAttribute("rel") === "stylesheet"
  );

  for (let i = 0; i < styleLinks.length; i++) {
    let stylePath = styleLinks[i].getAttribute("href");
    let cssFile = path.resolve("./build" + stylePath);
    styleLinks[i].setAttribute("media", "print");
    styleLinks[i].setAttribute("onload", "this.media='all'");

    await fs
      .readFile(cssFile, "utf8")
      .then(async (css) => {
        let extractedCss = extractCss(css);

        if (extractedCss.critical && extractedCss.newCss) {
          critical += extractedCss.critical;
          let newPath = generateNewStylePath(stylePath);
          styleLinks[i].setAttribute("href", newPath);

          await fs.writeFile(
            "./build" + newPath,
            extractedCss.newCss,
            (err) => {
              if (err) throw err;
            }
          );
        }
      })
      .catch((err) => console.error("Something went wrong:", err));
  }

  if (critical) {
    inlineStyle.append(critical);
    dom.window.document.head.append(inlineStyle);
  }

  return dom.serialize();
}

function extractCss(css) {
  let classList = CRITICAL_CLASSES;

  let importRegex = new RegExp("@import(.*?);", "g");
  let rootRegex = new RegExp(":root(.*?)}", "g");
  let bodyRegex = new RegExp("body(.*?)}", "g");

  let critical = "";
  let newCss = css;

  let regexList = [
    importRegex,
    rootRegex,
    bodyRegex,
    ...classList.map((i) => new RegExp(`\\.${i}(.*?)}`, "g")),
  ];

  regexList.forEach((regex) => {
    let matchedList = css.match(regex);
    if (matchedList) {
      critical += matchedList.join("");
      matchedList.forEach((element) => {
        newCss = newCss.replace(element, "");
      });
    }
  });

  return {
    critical,
    newCss,
  };
}

function generateNewStylePath(stylePath) {
  let pathArr = stylePath.split("/");
  let fileName = pathArr[pathArr.length - 1];
  let hash = fileName.split(".")[1];
  let newNameArr = fileName.split(".");
  newNameArr.splice(3, 0, hash);
  pathArr[pathArr.length - 1] = newNameArr.join(".");

  return pathArr.join("/");
}

export { createCriticalCss };
