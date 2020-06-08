const fs = require('fs')
const axios = require("axios");

module.exports = {
	name: 'cat',
	description: 'Return a random cat image',
	execute(message) {
    axios.get(
      "https://api.thecatapi.com/v1/images/search",
      {
        headers:
        {
          'Content-Type': 'application/json',
          "x-api-key": process.env.CAT_API_KEY
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
