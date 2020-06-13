module.exports = {
	name: 'skip',
	description: 'Skip a song',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		// only allowing users to use music commands in dedicated channel
		if(`${message.channel}` != `<#${process.env.PLAYLIST_TEXT_CHANNEL_ID}>`)
			return message.channel.send(`You need to be in the ${process.env.PLAYLIST_CHANNEL} text channel to make music requests.`)
		if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to stop the music!');
		if (!serverQueue) return message.channel.send('There is no song that I could skip!');
		serverQueue.connection.dispatcher.end();
	},
};
