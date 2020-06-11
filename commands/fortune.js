const fs = require('fs')
const path = require('path')
const Discord = require('discord.js');

module.exports = {
	name: 'fortune',
	description: `Open a fortune cookie`,
	execute(message) {
    fs.readFile(path.join(__dirname, '../util/fortunes.txt'), function(err, data) {
      if(err) console.log(err);
      var fortunes = data.toString().split("\n");
      let choice = Math.floor(Math.random() * fortunes.length)
			const output = new Discord.MessageEmbed()
				.setColor(process.env.EMBED_COLORS)
				.setTitle('You opened a cookie!')
				.addFields(
					{ name: 'Fortune', value: `\`\`\`css\n \[${fortunes[choice]}\]\`\`\`` },
				)
				.setImage("https://www.irishnews.com/picturesarchive/irishnews/irishnews/2017/07/21/132013632-5283a721-8e7b-49a6-b915-a594547f51af.jpg")
      return message.reply(
        output
      )
    })
	}
}
