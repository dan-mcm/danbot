module.exports = {
	name: 'nowplaying',
	description: 'Get the song that is playing',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		// only allowing users to use music commands in dedicated channel
		if(`${message.channel}` != `<#${process.env.PLAYLIST_TEXT_CHANNEL_ID}>`)
			return message.channel.send(`You need to be in the ${process.env.PLAYLIST_CHANNEL} text channel to make music requests.`)
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`Now playing: ${serverQueue.songs[0].title}`);
	},
};
