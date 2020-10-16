const cheerio = require("cheerio");
const superagent = require("superagent");

module.exports = function () {
  return new Promise((resolve, reject) => {
    superagent.get(process.env.AICHA_URL).end((err, res) => {
      if (err) return reject(err);
      const $ = cheerio.load(res.text);

      const target = $(".main-Box .card-Box .cardCnt").eq(0);
      const image = $(".images", target).css("background");
      // 返回数据
      return resolve({
        image: image.match(/url\('(.*)'\)/)[1],
        date: $(".textTitle", target).text(),
        content: $(".textCnt", target).text(),
      });
    });
  });
};
