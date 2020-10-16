const cheerio = require("cheerio");
const superagent = require("superagent");

module.exports = function () {
  return new Promise((resolve, reject) => {
    superagent.get(process.env.MOJI_URL).end((err, res) => {
      if (err) return reject(err);
      const $ = cheerio.load(res.text);
      // 获取天气信息
      const li = $(".wea_alert ul li").eq(0);
      // 返回天气数据
      return resolve({
        // 空气质量
        air: $("em", li).text(),
        airImg: $("img", li).prop("src"),
        // 实时天气
        tem: $(".wea_weather em").text(),
        // 早晚天气变化
        wea: $(".wea_weather b").text(),
        // 天气图标
        weaImg: $(".wea_weather span img").prop("src"),
        // 相对湿度
        humidity: $(".wea_about span").text(),
        // 风向
        wind: $(".wea_about em").text(),
        tips: $(".wea_tips em").text(),
      });
    });
  });
};
