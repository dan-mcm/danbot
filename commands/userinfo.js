const { getUserFromMention } = require('../util/getUser')

module.exports = {
	name: 'userinfo',
	description: 'Get information about a user e.g. !userinfo @Danku',
	execute(message, client) {
    console.log(`MESSAGE ${message}`)
    console.log(`MESAAGE CONTENT ${message.content}`)
		const split = message.content.split(/ +/);
    console.log(`SPLIT ${split}`)
		const args = split.slice(1);
    console.log( `ARGS ${args}`)
		const user = getUserFromMention(args[0], client);
    console.log(`USER ${user}`)
		message.channel.send(`Name: ${user.username}, ID: ${user.id}, Avatar: ${user.displayAvatarURL({ dynamic: true })}`);
	}
};
