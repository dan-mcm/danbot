const Discord = require("discord.js");
const { getUserFromMention } = require('../util/getUser')

module.exports = {
	name: 'whitelist',
	description: `Get the users currently whitelisted for shouting out when going live on Twitch.`,
	execute(message, client) {

    const output = new Discord.MessageEmbed()
			.setColor(process.env.EMBED_COLORS)
			.setTitle('Whitelist')
			.setDescription('*Channels currently whitelisted for shouting out when going live on Twitch*')
			.addFields(
				{ name: '**Approved Channels**', value: `\`\`\`${process.env.TWITCH_CHANNELS.split(',').sort().join(', ')}\`\`\`` },
        { name: '**Want to be added?**', value: `Reach out to the server owner or bot maintainer with your channel name to be added to the whitelist.` },
			)

		message.channel.send(output);
	}
};
