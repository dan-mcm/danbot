const { getUserFromMention } = require('../util/getUser')

module.exports = {
	name: 'kick',
	description: 'Kick a user e.g. !kick @user reason',
	execute(message, client) {
		const split = message.content.split(/ +/);
		const args = split.slice(1);

    let reason = args.slice(1).join(' ');
		const member = message.mentions.members.first();
    if(!reason) reason = "No reason provided";

		if (!member) {
			return message.reply('You need to mention the member you want to kick');
		}

    if(!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

		return member.kick()
			.then(() => message.reply(`${member.user.tag} has been kicked by ${message.author.tag} reason: ${reason}`))
			.catch(error => message.reply(`Sorry I couldn't kick because of: ${error}`));
	},
};
