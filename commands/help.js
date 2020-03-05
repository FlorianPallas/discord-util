const config = require('../config');
const util = require('../util');
const messageFailed = 'Could not show help! :cry:';

module.exports.execute = async (args, context) => {
  try
  {
    // Check for bot channel
    if(!context.message.channel.name.includes('bot')) {
      util.ErrorBotChannelOnly(messageFailed, context.message);
      return;
    }

    // Send reply
    context.message.channel.send(`${config.botPrefix}help\n> Lists all available commands.\n${config.botPrefix}ping\n> Shows current bot and api latency.\n${config.botPrefix}p / ${config.botPrefix}purge <amount>\n> Deletes the specified amount of messages.\n${config.botPrefix}s / ${config.botPrefix}share\n> Generates the sharing link of the voice channel you are in.\n`);
  }
  catch (err)
  {
    util.Error(messageFailed, err, context.message);
  }
};