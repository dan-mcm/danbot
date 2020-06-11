const Discord = require("discord.js");
const { getUserFromMention } = require('../util/getUser')

module.exports = {
	name: 'userinfo',
	description: `Get information about a user e.g. ${process.env.BOT_PREFIX}userinfo @user`,
	execute(message, client) {
		const split = message.content.split(/ +/);
		const args = split.slice(1);

		if(args.length < 1){
			return message.channel.send(`Please specify a user e.g. ${process.env.BOT_PREFIX}userinfo @user`)
		}

		const user = getUserFromMention(args[0], client);

		console.log(`DEBUG ${JSON.stringify(user)}`)

		const output = new Discord.MessageEmbed()
			.setColor(process.env.EMBED_COLORS)
			.setTitle(`${user.username} Overview`)
			.setThumbnail(user.displayAvatarURL({ dynamic: true }))
			.addFields(
				{ name: '**UserTag**', value: user.tag },
				{ name: '**UserID**', value: user.id },
				{ name: '**User Avatar**', value: user.displayAvatarURL({ dynamic: true }) },
				{ name: '**Human or Bot?**', value: `${(user.bot) ? "Bot" : "Human"}` }
			)

		message.channel.send(output);
	}
};
