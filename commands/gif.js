const fs = require('fs')
const giphyRandom = require("giphy-random");

module.exports = {
	name: 'gif',
	description: 'Return a random gif (general audience rating)',
	execute(message) {
    giphyRandom(
      process.env.GIPHY_API_KEY
    )
    .then(response =>
      message.channel.send({files: [response.data.images.fixed_height.url]
      })
    )
	},
};
