const Discord = require("discord.js");
const { getUserFromMention } = require('../util/getUser')
const { GoogleSpreadsheet } = require('google-spreadsheet');

async function getWhitelistedUsers() {
	const doc = new GoogleSpreadsheet(process.env.WHITELIST_SPREADSHEET_ID);

	await doc.useServiceAccountAuth({
	  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
	  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\n/g, '\n'),
	});

	await doc.loadInfo()
	const sheet = doc.sheetsByIndex[0]
	const rows = await sheet.getRows()

	let whitelistedUsers = []
	rows.map(data =>
		whitelistedUsers.push(data.usernames)
	)

	return whitelistedUsers
}

module.exports = {
	name: 'whitelist',
	description: `List whitelisted users for shouting out when live on Twitch`,
	execute(message, client) {
		getWhitelistedUsers()
		.then(users => {
			console.log(`WHITELISTED USERS: ${users}`)
			const output = new Discord.MessageEmbed()
				.setColor(process.env.EMBED_COLORS)
				.setTitle('Whitelist')
				.setDescription('*Channels currently whitelisted for shouting out when going live on Twitch*')
				.addFields(
					{ name: '**Approved Channels**', value: `\`\`\`${users.sort().join(',\ ')}\`\`\`` },
	        { name: '**Want to be added?**', value: `Reach out to the server owner or bot maintainer with your channel name to be added to the whitelist.` },
				)
				message.channel.send(output);
			}
		)
	}
};
