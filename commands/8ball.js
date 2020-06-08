const fs = require('fs')

module.exports = {
	name: '8ball',
	description: `Ask the 8ball your question e.g. ${process.env.BOT_PREFIX}8ball will tomorrow be sunny?`,
	execute(message) {
    let options = [
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes – definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful."
    ]
    let choice = Math.floor(Math.random() * options.length)
		return message.reply(
      `the 8ball has spoken:\n\`\`\`json\n\"${options[choice]}\"\`\`\``,
    )
	},
};
