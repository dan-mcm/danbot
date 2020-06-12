const Discord = require("discord.js");
const { getUserFromMention } = require('../util/getUser')
const { GoogleSpreadsheet } = require('google-spreadsheet');

async function deleteWhitelistedUser(user, message){
	const doc = new GoogleSpreadsheet(process.env.WHITELIST_SPREADSHEET_ID);

	// use service account creds
	await doc.useServiceAccountAuth({
	  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
	  private_key: process.env.GOOGLE_PRIVATE_KEY,
	});

	await doc.loadInfo()
	const sheet = doc.sheetsByIndex[0]
	const rows = await sheet.getRows()

	rows.map(data => {
		if (data.usernames == user){
			console.log(`Found and deleting entry for ${user}.`)
			data.del()
			message.channel.send(`🗑️ Deleted \`${user}\` from whitelist.`)
			}
		}
	)
}

module.exports = {
	name: 'whitelistdelete',
	description: `Delete a Twitch username from the going-live whitelist`,
	execute(message, client) {
    const split = message.content.split(/ +/);
		const args = split.slice(1);
		deleteWhitelistedUser(args, message)

	}
};
