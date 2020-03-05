module.exports.Error = async (text, error, message) => {
  message.channel.send(text + '\n> ' + error);
};

module.exports.ErrorNoPermission = async (text, message) => {
  message.channel.send(text + '\n> Error: You don\'t have permission!');
};

module.exports.ErrorNoVoiceChannel = async (text, message) => {
  message.channel.send(text + '\n> Error: You\'re currently not in a voice channel!');
};

module.exports.ErrorBotChannelOnly = async (text, message) => {
  const m = await message.channel.send(text + '\n> Error: Please use the dedicated bot channel for these commands!');
  m.delete({ timeout: 10000 });
};