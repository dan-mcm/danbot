const fs = require('fs')

module.exports = {
	name: 'commands',
	description: 'List all available commands',
	execute(message) {
		let output = "**The following commands are available** \n\n";
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
		console.log(`COMMANDFILES ${commandFiles}`)

		let helpfulCommands = ['commands', 'help', 'ping', 'purge']
		let userControl = ['ban', 'kick', 'userinfo']
		let playbackControl = ['nowplaying','play','queue','skip','stop']

		let helpful = '*Help Commands* ```json\n'
		let user = '*User Commands* ```json\n'
		let playback = '*Music Commands* ```json\n'
		let additional = '*Additional Commands* ```json\n'

		for (const file of commandFiles) {
			const command = require(`./${file}`);
				if(helpfulCommands.indexOf(command.name) !== -1)
					helpful += `"${process.env.BOT_PREFIX}${command.name}" ${command.description} \n`;

				if(userControl.indexOf(command.name) !== -1)
					user += `"${process.env.BOT_PREFIX}${command.name}" ${command.description} \n`;

				if(playbackControl.indexOf(command.name) !== -1)
					playback += `"${process.env.BOT_PREFIX}${command.name}" ${command.description} \n`;

				if(
					helpfulCommands.indexOf(command.name) == -1 &&
					userControl.indexOf(command.name) == -1 &&
					playbackControl.indexOf(command.name) == -1
				)
				additional += `"${process.env.BOT_PREFIX.replace(/[0-9]/g, "X")}${command.name}" ${command.description} \n`;
		}

		helpful += '```\n'
		user += '```\n'
		playback += '```\n'
		additional += '```\n'

		output += helpful + user + playback + additional
		console.log(`DEBUG ${output}`)
		message.channel.send(output);
	},
};
