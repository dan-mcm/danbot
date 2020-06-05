const ytdl = require("ytdl-core");

module.exports = {
  name: "queue",
  description: "Shows the current song queue",
  async execute(message) {
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
