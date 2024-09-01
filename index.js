import axios from "axios";
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

async function getOscarWinners() {
  const axios = require("axios");

  const options = {
    method: "GET",
    url: "https://imdb188.p.rapidapi.com/api/v1/emmyWinners",
    headers: option,
  };

  try {
    const response = await axios.request(options);
    return { data: response.data.data, statusCode: response.status };
  } catch (error) {
    return { data: error, statusCode: response.status };
  }
}

async function getEmmyWinners() {
  const axios = require("axios");

  const options = {
    method: "GET",
    url: "https://imdb188.p.rapidapi.com/api/v1/emmyWinners",
    headers: option,
  };

  try {
    const response = await axios.request(options);
    return { data: response.data.data, statusCode: response.status };
  } catch (error) {
    return { data: error, statusCode: response.status };
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
    return { data: error, statusCode: response.status };
  }
}

app.get("/", async (req, res) => {
  let weeklyTop10Call = await getWeeklyTop10();

  res.render("index.ejs", { weeklyTop10: weeklyTop10Call });
});

app.listen(port, () => {
  console.log(`Node Server Running on: ${port}`);
});
