const fs = require('fs')
const axios = require("axios");

module.exports = {
	name: 'neko',
	description: 'Return a random neko image',
	execute(message) {
    axios.get(
      "https://nekos.best/api/v2/neko",
      {
        headers:
        {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(data =>
      {
      console.log(`data debug ${JSON.stringify(data.data)}`)
      return message.channel.send({files: [data.data.results[0].url]})
      }
    )
    .catch(err =>
      console.log(err)
    )
	}
};
