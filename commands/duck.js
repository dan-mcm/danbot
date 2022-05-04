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
      return message.channel.send({files: [data.data[0].url]})
      }
    )
    .catch(err =>
      console.log(err)
    )
	}
};
