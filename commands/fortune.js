const fs = require('fs')
const path = require('path')

module.exports = {
	name: 'fortune',
	description: `Open a fortune cookie`,
	execute(message) {
    fs.readFile(path.join(__dirname, '../util/fortunes.txt'), function(err, data) {
      if(err) console.log(err);
      var fortunes = data.toString().split("\n");
      let choice = Math.floor(Math.random() * fortunes.length)
      return message.reply(
        ` you open a cookie - the fortune reads:\n\`\`\`css\n\[${fortunes[choice]}\]\`\`\``,
        {files: ["https://www.irishnews.com/picturesarchive/irishnews/irishnews/2017/07/21/132013632-5283a721-8e7b-49a6-b915-a594547f51af.jpg"]}
      )
    })
	}
}
