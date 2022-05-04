const fs = require('fs')
const axios = require("axios");

module.exports = {
	name: 'duck',
	description: 'Return a random duck image',
	execute(message) {
    axios.get(
      "https://random-d.uk/api/v2/random",
      {
        headers:
        {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(data =>
      {
      console.log(`data debug ${JSON.stringify(data)}`)
      return message.channel.send({files: [data.url]})
      }
    )
    .catch(err =>
      console.log(err)
    )
	}
};
