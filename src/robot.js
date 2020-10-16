const { Wechaty } = require("wechaty");
const { PuppetPadplus } = require("wechaty-puppet-padplus");
const {
  EventLogger,
  QRCodeTerminal,
  FriendshipAccepter,
} = require("wechaty-plugin-contrib");

const { start, stop } = require("./schedule");

module.exports = function () {
  const robot = new Wechaty({
    name: "wechat-robot",
    // puppet: new PuppetPadplus({ token: process.env.PUPPET_PADPLUS_TOKEN }),
  });
  robot.use(EventLogger());
  robot.use(QRCodeTerminal({ small: false }));
  robot.use(FriendshipAccepter({ keyword: "9527" }));
  // 监听登录
  robot.on("login", (user) => start(robot, user));
  // 启动机器人
  robot.start();
};
