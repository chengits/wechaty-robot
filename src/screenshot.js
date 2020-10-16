const path = require("path");
const dayjs = require("dayjs");
const puppeteer = require("puppeteer");

module.exports = async function () {
  // 启动浏览器
  const browser = await puppeteer.launch({
    defaultViewport: { width: 400, height: 580 },
  });
  // 获取当前时间
  const date = dayjs().format("YYYY-MM-DD HHmmss");
  // 保存文件
  const file = path.join(__dirname, `./../photos/${date}.jpg`);
  // 打开新页面
  const page = await browser.newPage();
  // 跳转到指定路径
  await page.goto("http://localhost:3000");
  // 生成页面截图
  await page.screenshot({
    path: file,
    omitBackground: true,
    quality: 100,
    type: "jpeg",
  });
  // 关闭浏览器
  await browser.close();
  // 返回图片路径
  return file;
};
