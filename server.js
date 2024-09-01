import axios from "axios";
import fs from "fs";
import { readFile } from "fs/promises";
import bodyParser from "body-parser";
import ejs from "ejs";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.set("view engine", ejs);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const option = {
  "x-rapidapi-key": "a25f8fd4cdmsh49d1240ad963c7ap117817jsn7eedd639662a",
  "x-rapidapi-host": "imdb188.p.rapidapi.com",
};

async function keywordCategories() {
  const options = {
    method: "GET",
    url: "https://imdb188.p.rapidapi.com/api/v1/getKeywords",
    headers: option,
  };

  try {
    const response = await axios.request(options);
    return {
      data: response.data.data.popular_keywords,
      statusCode: response.status,
    };
  } catch (error) {
    return { data: error.response.data.message, statusCode: error.status };
  }
}

async function genreCategories() {
  const options = {
    method: "GET",
    url: "https://imdb188.p.rapidapi.com/api/v1/getGenres",
    headers: option,
  };

  try {
    const response = await axios.request(options);
    return {
      data: response.data.data.popular_genres,
      statusCode: response.status,
    };
  } catch (error) {
    return { data: error.response.data.message, statusCode: error.status };
  }
}

async function getOscarWinners() {
  const options = {
    method: "GET",
    url: "https://imdb188.p.rapidapi.com/api/v1/emmyWinners",
    headers: option,
  };

  try {
    const response = await axios.request(options);
    return { data: response.data.data, statusCode: response.status };
  } catch (error) {
    return { data: error.response.data.message, statusCode: error.status };
  }
}

async function getEmmyWinners() {
  const options = {
    method: "GET",
    url: "https://imdb188.p.rapidapi.com/api/v1/emmyWinners",
    headers: option,
  };

  try {
    const response = await axios.request(options);
    return { data: response.data.data, statusCode: response.status };
  } catch (error) {
    return { data: error.response.data.message, statusCode: error.status };
  }
}

async function getWeeklyTop10() {
  const options = {
    method: "GET",
    url: "https://imdb188.p.rapidapi.com/api/v1/getWeekTop10",
    headers: option,
  };

  try {
    const response = await axios.request(options);
    return { data: response.data.data, statusCode: response.status };
  } catch (error) {
    return { data: error.response.data.message, statusCode: error.status };
  }
}

async function getWeeklyTop10Local() {
  let response = JSON.parse(
    await readFile(__dirname + "/data/week_top_10.json", "utf8")
  );
  return { data: response.data, statusCode: 200 };
}

async function genreCategoriesLocal() {
  let response = JSON.parse(
    await readFile(__dirname + "/data/config_genres.json", "utf8")
  );
  return { data: response.data.popular_genres, statusCode: 200 };
}

async function keywordCategoriesLocal() {
  let response = JSON.parse(
    await readFile(__dirname + "/data/config_keywords.json", "utf8")
  );
  return { data: response.data.popular_keywords, statusCode: 200 };
}

app.get("/", async (req, res) => {
  // let weeklyTop10Call = await getWeeklyTop10();
  // let genreCategoriesCall = await genreCategories();
  // let keywordCategoriesCall = await keywordCategories();

  let weeklyTop10Call = await getWeeklyTop10Local();
  let genreCategoriesCall = await genreCategoriesLocal();
  let keywordCategoriesCall = await keywordCategoriesLocal();

  console.log(weeklyTop10Call);

  res.render("index.ejs", {
    genres: genreCategoriesCall,
    keywords: keywordCategoriesCall,
    weeklyTop10: weeklyTop10Call,
  });
});

app.get("/populars", (req, res) => {
  res.render("popular.ejs", {});
});

app.listen(port, () => {
  console.log(`Node Server Running on: ${port}`);
});
