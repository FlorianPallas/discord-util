const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('./commands');
const config = require('./config');
require('dotenv').config();

client.on('ready', () => {
  // Log event
  console.log('[discord-util] Ready');

  // Set bot activity
  client.user.setActivity('as you type...', { type: 'WATCHING' });
});

client.on('message', async message => {
  
  // Ignore own messages
  if(message.author.bot) return;

  // Ignore messages without prefix
  if(message.content.indexOf(config.botPrefix) !== 0) return;

  // Ignore messages with more than on prefix character
  if(message.content.split(config.botPrefix).length - 1 > 1) return;

  // Get command and arguments
  const args = message.content.slice(config.botPrefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Execute command
  commands.execute(command, args, { message, client });
});

client.login(process.env.BOT_TOKEN);