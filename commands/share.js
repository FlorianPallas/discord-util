const util = require('../util');
const messageFailed = 'Could not generate sharing link! :cry:';

module.exports.execute = async (args, context) => {
  try
  {
    // Check for bot channel
    if(!context.message.channel.name.includes('bot')) {
      util.ErrorBotChannelOnly(messageFailed, context.message);
      return;
    }

    // Gather info
    const sv = context.message.guild;
    const uid = context.message.author.id;
    const member = context.message.guild.members.get(uid);
    const vc = member.voiceChannel;

    // Check if user is in voice channel
    if (!vc) {
      util.ErrorNoVoiceChannel(messageFailed, context.message);
      return;
    }

    // Send link
    context.message.channel.send(`[${vc.name}]: https://discordapp.com/channels/${sv.id}/${vc.id}`);
  }
  catch (err)
  {
    util.Error(messageFailed, err, context.message);
  }
};