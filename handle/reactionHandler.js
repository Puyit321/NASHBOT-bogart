function handleReaction(api, event) {
  const { messageID, reaction, threadID } = event;

  if (reaction === '👍') {
    api.sendMessage("Thanks for the thumbs up!", threadID, messageID);
  } else if (reaction === '👎') {
    api.sendMessage("Sorry to hear that!", threadID, messageID);
  }
}

module.exports = handleReaction;
