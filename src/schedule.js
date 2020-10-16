const path = require('path')
const { FileBox } = require("wechaty");
const schedule = require("node-schedule");
const screenshot = require("./screenshot");

exports.doWorker = async function(robot){
  try {
    // 查找好友
    let contact =
      (await robot.Contact.find({ name: process.env.NICKNAME })) ||
      (await robot.Contact.find({ alias: process.env.NAME }));
    // 启动浏览器
    const filepath = await screenshot();
    // 给尾巴发消息
    const image = FileBox.fromFile(filepath, path.basename(filepath));
    // 发送消息
    await contact.say(image);
  } catch (err) {
    console.log("错误：\n", err);
  }
}

exports.start = function (robot, user) {
  exports.doWorker(robot);

  // 开启定时任务
  schedule.scheduleJob(process.env.SENDTIME, async () => {
    exports.doWorker()
  });
};

exports.stop = function (robot) {};
