module.exports = {
	name: 'purge',
	description: 'Delete the last messages in all chats (requires value between 2-100)',
	async execute(message) {
		const args = message.content.split(' ');
		let deleteCount = 0;
		try {
			deleteCount = parseInt(args[1], 10);
		}catch(err) {
			return message.reply('Please provide the number of messages to delete. (max 100)')
		}

		if (!message.member.hasPermission("KICK_MEMBERS"))
			return message.reply("you do not have privileges to purge channels.")

		if (!deleteCount || deleteCount < 2 || deleteCount > 100)
			return message.reply('Please provide a number between 2 and 100 for the number of messages to delete');

		const fetched = await message.channel.messages.fetch({
			limit: deleteCount,
		});
		message.channel.bulkDelete(fetched)
			.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	},
};
