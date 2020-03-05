const commandPurge = require('./purge');
const commandShare = require('./share');
const commandPing = require('./ping');
const commandHelp = require('./help');
const commandUnknown = require('./unknown');

module.exports.execute = async (command, args, context) => {
  switch(command)
  {
    case 'purge': { await commandPurge.execute(args, context); break; }
    case 'p': { await commandPurge.execute(args, context); break; }
    case 'share': { await commandShare.execute(args, context); break; }
    case 's': { await commandShare.execute(args, context); break; }
    case 'ping': { await commandPing.execute(args, context); break; }
    case 'help': { await commandHelp.execute(args, context); break; }
    default: { await commandUnknown.execute(args, context); break; }
  }
};