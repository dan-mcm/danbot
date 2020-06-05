const fs = require('fs')

module.exports = {
	name: 'help',
	description: 'Some getting started info for the bot',
	execute(message) {
		message.channel.send(
      `
      Hey there, looking to figure out how to best use me? You can see a full list of my active commands with the \`!commands\` option. \nFound an issue/bug you want to report? Please submit an issue here: https://github.com/dan-mcm/danbot/issues
      `
    );
	},
};
