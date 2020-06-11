const fs = require('fs')
const Discord = require("discord.js");

module.exports = {
	name: 'commands',
	description: 'List all available commands',
	execute(message) {
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		let helpfulCommands = ['commands', 'help', 'ping', 'purge']
		let userControl = ['ban', 'kick', 'userinfo', 'whitelist']
		let playbackControl = ['nowplaying','play','queue','skip','stop']

		let help = []
		let users = []
		let playback = []
		let additional = []

		for (const file of commandFiles) {
			const command = require(`./${file}`);
				if(helpfulCommands.indexOf(command.name) !== -1)
					help.push(`\`${process.env.BOT_PREFIX}${command.name}\` ${command.description}`)

				if(userControl.indexOf(command.name) !== -1)
					users.push(`\`${process.env.BOT_PREFIX}${command.name}\` ${command.description}`)

				if(playbackControl.indexOf(command.name) !== -1)
					playback.push(`\`${process.env.BOT_PREFIX}${command.name}\` ${command.description}`)

				if(
					helpfulCommands.indexOf(command.name) == -1 &&
					userControl.indexOf(command.name) == -1 &&
					playbackControl.indexOf(command.name) == -1
				)
				additional.push(`\`${process.env.BOT_PREFIX.replace(/[0-9]/g, "X")}${command.name}\` ${command.description}`)
		}

		const output = new Discord.MessageEmbed()
			.setColor(process.env.EMBED_COLORS)
			.setTitle('Commands')
			.setDescription('*The following commands are available*')
			.addFields(
				{ name: '**Help Commands**', value: help.join(`\n`) },
				{ name: '**User Commands**', value: users.join(`\n`) },
				{ name: '**Music Commands**', value: playback.join(`\n`) },
				{ name: '**Additional Commands**', value: additional.join(`\n`) }
			)

		message.channel.send(output);
	},
};
