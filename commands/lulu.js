const fs = require('fs');

module.exports = {
  name: 'lulu',
  description: 'Responds with a video when specific keywords are detected.',
  usage: '[nashPrefix]women',
  nashPrefix: false,
  execute(api, event, args, prefix) {
    const { threadID, messageID, body } = event;
    const lowerCaseBody = body.toLowerCase();

    if (lowerCaseBody.includes('lulo') || lowerCaseBody.includes('lulu')) {
      const msg = {
        body: "WANA NAG LULU NA",
        attachment: fs.createReadStream(__dirname + `/noprefix/lulu.mp4`)
      };

      api.sendMessage(msg, threadID, messageID);
    }
  },
};
