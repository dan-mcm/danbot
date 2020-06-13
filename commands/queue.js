const ytdl = require("ytdl-core");

module.exports = {
  name: "queue",
  description: "Shows the current song queue",
  async execute(message) {
    // only allowing users to use music commands in dedicated channel
    if(`${message.channel}` != `<#${process.env.PLAYLIST_TEXT_CHANNEL_ID}>`)
      return message.channel.send(`You need to be in the ${process.env.PLAYLIST_CHANNEL} text channel to make music requests.`)
    try {
      const args = message.content.split(" ");
      const queue = message.client.queue;
      const serverQueue = message.client.queue.get(message.guild.id);

      if (!serverQueue) {
          message.channel.send("Currently no songs in the Queue.");
        }
      else {

        message.channel.send(
          serverQueue.songs.map(
            (song, index) =>
            `${index+1}: ${song.title}`
          )
          .join('\n'), {}
        );
      }
    } catch(err) {
      return message.reply(`Error fetching queue. ${err}`)
    }
  }
}
