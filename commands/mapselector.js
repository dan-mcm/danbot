const fs = require('fs')
const Discord = require('discord.js');

module.exports = {
	name: 'mapselector',
	description: `Will return a map randomly selected from teh current C&C season map pool.`,
	execute(message) {
    let options = [
      "Vales of the Templars [Player1 TL -v- BRPlayer2]",
      "Vales of the Templars [Player1 TR -v- BLPlayer2]",
      "Vales of the Templars [Player2 TL -v- BR Player1]",
      "Vales of the Templars [Player2 TR -v- BL Player1]",
      "Canyon Paths [Player1 TL -v- BR Player2]",
      "Canyon Paths [Player1 TR -v- BL Player2]",
      "Canyon Paths [Player2 TL -v- BR Player1]",
      "Canyon Paths [Player2 TR -v- BL Player1]",
      "Neo Twin Peaks [Player1 T -v- B Player2]",
      "Neo Twin Peaks [Player2 T -v- B Player1]",
      "Duality 3.6 [Player1 L -v- R Player2]",
      "Duality 3.6 [Player2 L -v- R Player1]",
      "Frosted Hostilities [Player1 L -v- R Player2]",
      "Frosted Hostilities [Player2 R -v- L Player1]",
      "Quicksilver [Player1 L -v- R Player2]",
      "Quicksilver [Player2 R -v- L Player1]",
      "Higher Order [Player1 T -v- B Player2]",
      "Higher Order [Player2 T -v- B Player1]",
      "Sand Crystal Shard [Player1 L -v- R Player2]",
      "Sand Crystal Shard [Player2 R -v- L Player1]"
    ]

    let choice = Math.floor(Math.random() * options.length)
    message.reply('you are Player1.')
		return message.channel.send( `You will play your next ranked game on the map: \`\`\`css\n  ${options[choice]}\`\`\``)

	},
};
