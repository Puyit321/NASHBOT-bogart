module.exports = {
  name: "callad",
  role: "user",
  nashPrefix: false,
  execute(api, event) {
    const { body, senderID, threadID, messageID } = event;
    const adminID = global.adminUID;

    if (!body.trim()) {
      const usageMessage = "Usage: /callad <your message>\nPlease include a message to send to the admin.";
      api.sendMessage(usageMessage, threadID, messageID);
      return;
    }

    api.getUserInfo(senderID, (err, userInfo) => {
      if (err || !userInfo[senderID]) {
        api.sendMessage("Failed to retrieve your information.", threadID, messageID);
        return;
      }

      const userName = userInfo[senderID].name;
      const messageContent = body.replace(/^callad\s+/i, ""); // Tinatanggal ang "callad" sa mensahe
      const messageToOwner = `👤 User: ${userName}\n\n📩 Message: ${messageContent}`;

      api.sendMessage(messageToOwner, adminID, (err) => {
        if (err) {
          api.sendMessage("Failed to send your message to the admin.", threadID, messageID);
          return;
        }
        api.sendMessage("Your message has been sent to the admin.", threadID, messageID);
      });
    });
  }
};
