const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const dayjs = require("dayjs");

const getAicha = require("./src/request/aicha");
const getWeather = require("./src/request/weather");

const screenshot = require("./src/screenshot");
const startRobot = require("./src/robot");

// 加载环境变量
dotenv.config({});

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const word = await getAicha();
  const weather = await getWeather();
  // 获取数据
  const data = {
    ...word,
    ...weather,
    today: dayjs().format("YYYY-MM-DD"),
    diffDays: dayjs().diff(process.env.MEET_DAY, "day"),
  };
  res.render("index", data);
});

app.get("/photo", async (req, res) => {
  res.sendFile(await screenshot());
});

app.listen(3000, async () => {
  console.log("Example app listening on port 3000!");
  // 启动机器人
  // startRobot();
});
