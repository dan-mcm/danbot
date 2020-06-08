const fs = require('fs')

module.exports = {
	name: 'commands',
	description: 'List all available commands',
	execute(message) {
		let str = "The following commands are available \n```json\n";
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`./${file}`);
			str += `"${process.env.BOT_PREFIX}${command.name}" ${command.description} \n`;
		}
    str += '```'
		message.channel.send(str);
	},
};
