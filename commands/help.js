const fs = require('fs')

module.exports = {
	name: 'help',
	description: 'Some getting started info for the bot',
	execute(message) {
		message.channel.send(
      `
      Looking to figure out how to best use me? You can see a full list of my active commands with the \`!commands\` option. \nFound an issue/bug you want to report, have a new feature request, or want to request a copy of the Bot for your own server? Please submit an issue/request here: https://github.com/dan-mcm/danbot/issues/new/choose
      `
    );
	},
};
