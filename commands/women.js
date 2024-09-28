const fs = require('fs');

module.exports = {
  name: 'women',
  description: 'Responds with a video when specific keywords are detected.',
  usage: '[nashPrefix]women',
  nashPrefix: true,
  async execute(api, event, args, prefix) {
    const { threadID, body } = event;
    const lowerCaseBody = body.toLowerCase();

    if (lowerCaseBody.includes('women') || lowerCaseBody.includes('babae')) {
      const msg = {
        body: "WOMEN IS ALWAYS RIGHT 😪",
        attachment: fs.createReadStream(__dirname + '/noprefix/Women.mp4')
      };

      try {
        await api.sendMessage(msg, threadID);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  },
};
