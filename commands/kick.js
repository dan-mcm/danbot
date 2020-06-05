const { getUserFromMention } = require('../util/getUser')

module.exports = {
	name: 'kick',
	description: 'Kick a user e.g. !kick @user',
	execute(message, client) {
		const split = message.content.split(/ +/);
		const args = split.slice(1);

    const reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    const member = getUserFromMention(args[0], client);
		if (!member) {
			return message.reply('You need to mention the member you want to kick');
		}

    if(!message.member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    return message.member.kick(reason)
      .then(() => message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`))
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
	},
};
