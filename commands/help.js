const fs = require('fs')
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Some getting started info for the bot',
	execute(message) {

	const output = new Discord.MessageEmbed()
		.setColor(process.env.EMBED_COLORS)
		.setTitle('Help')
		.setDescription(`Looking to figure out how to best use me? You can see a full list of my active commands with the \`${process.env.BOT_PREFIX}commands\` option.` )
		.addFields(
			{ name: 'Bug Reporting', value: 'Found a bug or issue with the bot? Please submit a bug report here: https://github.com/dan-mcm/danbot/issues/new/choose' },
			{ name: 'Feature Request', value: 'Have an idea or new feature suggestion for the bot? Please submit a feature request here: https://github.com/dan-mcm/danbot/issues/new/choose' },
			{ name: 'Want the Bot?', value: 'Interested in having a copy of the bot on your server? Submit a server setup request here: https://github.com/dan-mcm/danbot/issues/new/choose' },
		)

		message.channel.send(output);
	}
};
