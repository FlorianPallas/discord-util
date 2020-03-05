const config = require('../config');
const util = require('../util');
const messageFailed = 'Could not delete messages! :cry:';

module.exports.execute = async (args, context) => {
  //try
  //{
    // Check users permissions
    if (!context.message.member.hasPermission('MANAGE_MESSAGES', false, false)) {
      util.ErrorNoPermission(messageFailed, context.message);
      return;
    }

    // Fetch messages
    const deleteLimit = Math.min(parseInt(args[0]), config.purgeLimit);
    const deleted = await context.message.channel.bulkDelete(deleteLimit, true);
    const deleteCount = deleted.size;

    if(args[1] === 'force') {
      const diff = Math.min(deleteLimit - deleteCount, config.purgeForceLimit);
      if (diff > 0) {
        const fetched = await context.message.channel.messages.fetch({ limit: diff });
        fetched.forEach(msg => {
          msg.delete();
        });
      }
      deleteCount += diff;
    }

    // Reply
    let m;
    if (deleteCount > 1) {
      m = await context.message.channel.send(`*Swoosh!* Deleted the last **${deleteCount}** messages! :broom:`);
    } else if(deleteCount === 1) {
      m = await context.message.channel.send('*Swoosh!* Deleted the last message! :broom:');
    } else {
      m = await context.message.channel.send('Could not delete any messages! :cry:');
    }
    
    m.delete({ timeout: 5000 });
  /*
  }
  catch (err)
  {
    util.Error(messageFailed, err, context.message);
  }
  */
};