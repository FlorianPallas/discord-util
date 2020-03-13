const util = require('../util');
const messageFailed = 'Ping failed! :cry:';

module.exports.execute = async (args, context) => {
  try
  {
    // Check for bot channel
    if(!context.message.channel.name.includes('bot')) {
      util.ErrorBotChannelOnly(messageFailed, context.message);
      return;
    }

    // Send Pong
    const m = await context.message.channel.send('Checking...');
    m.edit(`Pong! Latency is ${m.createdTimestamp - context.message.createdTimestamp}ms.`);
  }
  catch (err)
  {
    util.Error(messageFailed, err, context.message);
  }
};