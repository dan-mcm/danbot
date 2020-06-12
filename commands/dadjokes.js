const fs = require('fs')
const axios = require("axios");

module.exports = {
	name: 'dadjoke',
	description: 'If you want to hear some terrible jokes.',
	execute(message) {
    axios.get(
      "https://icanhazdadjoke.com/",
      {
        headers:
        {
          'Accept': 'application/json',
        }
      }
    )
    .then(data =>
      {
        message.channel.send(
          data.data.joke
        )
      }
    )
    .catch(err =>
      console.log(err)
    )
	}
};
