const { getUserFromMention } = require('../util/getUser')

module.exports = {
	name: 'ping',
	description: 'Get latency information',
	execute(message, client) {
    const split = message.content.split(/ +/);
    const args = split.slice(1);

    const start = new Date().getTime()
    const m = message.channel.send("Ping?");
    const end = new Date().getTime()

		const user = getUserFromMention(args[0], client);
		message.channel.send(`Pong! Latency is ${end - start}ms.`);
	}
};

// if(command === "ping") {
//   // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
//   // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
//   const m = await message.channel.send("Ping?");
//   m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
// }
