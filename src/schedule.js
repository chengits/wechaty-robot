const schedule = require("node-schedule");
const screenshot = require("./screenshot");

exports.start = function (robot, user) {
  // 开启定时任务
  schedule.scheduleJob(process.env.SENDTIME, async () => {
    try {
      // 查找好友
      let contact =
        (await bot.Contact.find({ name: process.env.NICKNAME })) ||
        (await bot.Contact.find({ alias: process.env.NAME }));
      // 启动浏览器
      const filepath = await screenshot();
      // 给尾巴发消息
      const image = FileBox.fromFile(filepath);
      // 发送消息
      await contact.say(image);
    } catch (err) {
      console.log("错误：\n", err);
    }
  });
};

exports.stop = function (robot) {};
