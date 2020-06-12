const Discord = require("discord.js");
const { getUserFromMention } = require('../util/getUser')


const { GoogleSpreadsheet } = require('google-spreadsheet');

async function addWhitelistedUser(user, message){
  console.log(`Validating User ${user}`)
	const doc = new GoogleSpreadsheet(process.env.WHITELIST_SPREADSHEET_ID);

	await doc.useServiceAccountAuth({
	  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
	  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	});

	await doc.loadInfo()
	const sheet = doc.sheetsByIndex[0]
  const addition = await sheet.addRow({ usernames: `${user}` })
  const rows = await sheet.getRows()

  message.channel.send(`+ Added \`${user}\` to whitelist.`)
}

module.exports = {
	name: 'whitelistadd',
	description: `Delete a Twitch username from the going-live whitelist`,
	execute(message, client) {
    const split = message.content.split(/ +/);
		const args = split.slice(1);
		addWhitelistedUser(args, message)
	}
};
