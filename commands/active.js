const moment = require("moment");

module.exports = {
  name: "active",
  role: "admin",
  nashPrefix: false,
  execute(api, event) {
    const { onlineUsers } = global.NashBoT;
    if (onlineUsers.size === 0) {
      api.sendMessage("No active users.", event.threadID);
      return;
    }

    let message = "𝖫𝗂𝗌𝗍 𝗈𝖿 𝖠𝖼𝗍𝗂𝗏𝖾:\n\n";
    let count = 1;

    onlineUsers.forEach(({ userID, sessionStart }, uid) => {
      const name = onlineUsers.get(userID).realName;
      const uptime = moment.duration(moment().diff(moment(sessionStart)));
      const days = uptime.days();
      const hours = uptime.hours();
      const minutes = uptime.minutes();
      const seconds = uptime.seconds();

      message += `[ ${count} ]\n`;
      message += `𝗡𝗔𝗠𝗘: ${name}\n`;
      message += `𝗨𝗣𝗧𝗜𝗠𝗘: ${days} 𝖽𝖺𝗒𝗌 ${hours} 𝗁𝗈𝗎𝗋𝗌 ${minutes} 𝗆𝗂𝗇𝗎𝗍𝖾𝗌 ${seconds} 𝗌𝖾𝖼𝗈𝗇𝖽𝗌\n\n`;

      count++;
    });

    api.sendMessage(message, event.threadID);
  },
};
