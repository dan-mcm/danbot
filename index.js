const fs = require('fs')
const Discord = require("discord.js");
const Client = require('./client/Client');
const Canvas = require('canvas');

// loading giphy api key from dotenv config
const result = require('dotenv').config()

if (result.error) {
  throw result.error
}

// extension of the discord client with the queue system for music purposes
const client = new Client();

client.commands = new Discord.Collection();

// reading in command files from command folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// debug
console.log(client.commands);
client.once('ready', () => {
	console.log('Ready!');
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

// This event will run if the bot starts, and logs in, successfully.
client.on("ready", () => {
  console.log(`Bot has started, with ${Object.keys(client.users).length} users, in ${Object.keys(client.channels).length} channels of ${Object.keys(client.guilds).length} guilds.`);
  client.user.setActivity(`Serving ${Object.keys(client.guilds).length} servers`);
});

// client.on("guildCreate", guild => {
//   // This event triggers when the bot joins a guild.
//   console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
//   client.user.setActivity(`Serving ${Object.keys(client.guilds).length} servers`);
// });
//
// client.on("guildDelete", guild => {
//   // this event triggers when the bot is removed from a guild.
//   console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
//   client.user.setActivity(`Serving ${Object.keys(client.guilds).length} servers`);
// });

// util function to replace legacy function within ctx that no longer exists
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

// This event will run on every new member that arrives to the channel
client.on("guildMemberAdd", async member => {
  // channel variable appears unusable... might need hardcoded channel... could set via .env
	const channel = member.guild.channels.cache.find(channel => channel.name === process.env.WELCOME_CHANNEL);
	if (!channel) return;
	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./images/wallpaper.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
});

client.on('message', message => {
	if (message.content === '!join') {
		client.emit('guildMemberAdd', message.member);
	}
});

// This event will run on every single message received, from any channel or DM.
client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(process.env.BOT_PREFIX) !== 0) return;

  const args = message.content.slice(process.env.BOT_PREFIX.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);

  try {
    if(
      commandName == "ban" ||
      commandName == "userinfo" ||
      commandName == "kick" ||
      commandName == "ping"
    ){
      command.execute(message, client);
    } else {
      command.execute(message);
    }
  } catch (error) {
    console.error(error);
		message.reply('Error using command, Are you sure you used it correctly? \nUse !commands for a full list of commands.');
  }

});

client.login(process.env.BOT_TOKEN);
