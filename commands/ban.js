const { getUserFromMention } = require('../util/getUser')

module.exports = {
	name: 'ban',
	description: `Ban a user e.g. ${process.env.BOT_PREFIX}ban @user reason`,
	execute(message, client) {
		const split = message.content.split(/ +/);
		const args = split.slice(1);
		const member = message.mentions.members.first();

		let reason = args.slice(1).join(' ');
		if(!reason) reason = "No reason provided";

		if (!member) {
			return message.reply('You need to mention the member you want to ban');
		}

		if (!message.member.hasPermission("BAN_MEMBERS"))
			return message.reply("you do not have permission to ban members.")

		if (!member.bannable){
			return message.reply('I cannot ban this user! Do they have a higher role? Do I have ban permissions?');
		}

		return member.ban()
		.then(() => message.reply(`you have banned ${member.user} \n\`\`\`reason: ${reason}\`\`\``))
		.catch(error => message.reply(`Sorry I couldn't ban because of: ${error}`));
	},
};
