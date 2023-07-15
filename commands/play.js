const ytdl = require("ytdl-core");
const searchYouTube = require("youtube-api-v3-search");

async function coreLogic(youtubeUrl, queue, serverQueue, message, voiceChannel) {
  try {
    const songInfo = await ytdl.getInfo(youtubeUrl);

    if (!songInfo || !songInfo.videoDetails) {
      throw new Error("Unable to retrieve video metadata");
    }

    const { title, video_url } = songInfo.videoDetails;

    const song = {
      title: title,
      url: video_url
    };

    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };

      queue.set(message.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message, queueContruct.songs[0]);
      } catch (err) {
        console.error(err);
        queue.delete(message.guild.id);
        return message.channel.send(`Error: ${err.message}`);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`);
    }
  } catch (err) {
    console.error(`coreLogic Error: ${err}`);
    return message.channel.send(`${err.message}`);
  }
}

function play(message, song) {
  const queue = message.client.queue;
  const guild = message.guild;
  const serverQueue = queue.get(message.guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  try {
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(message, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  } catch (err){
    console.log(`Play Dispatch Error: ${err}`)
  }
}

module.exports = {
  name: "play",
  description: `Play a song in your active audio channel e.g. ${process.env.BOT_PREFIX}play some song *or* ${process.env.BOT_PREFIX}play youtube-url`,
  async execute(message) {
    try {
      const args = message.content.split(" ");
      const queue = message.client.queue;
      const serverQueue = message.client.queue.get(message.guild.id);
      const voiceChannel = message.member.voice.channel;

      // only allowing users to use music commands in dedicated channel
      if(`${message.channel}` != `<#${process.env.PLAYLIST_TEXT_CHANNEL_ID}>`)
        return message.channel.send(`You need to be in the ${process.env.PLAYLIST_TEXT_CHANNEL} text channel to make music requests.`)

      if (!voiceChannel)
        return message.channel.send(
          `You need to join the ${process.env.PLAYLIST_CHANNEL} voice channel to play music.`
        );

      if((message.member.voice.channel).toString() !== `<#${process.env.PLAYLIST_VOICE_CHANNEL_ID}>`)
        return message.channel.send(`Please use the dedicated music listening channel: ${process.env.PLAYLIST_CHANNEL}.`)

      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
          "I need the permissions to join and speak in your voice channel!"
        );
      }

      if (!args[1].includes("http")){
        args.shift()
        const options = {
          q: args.join(' '),
          part:'snippet',
          type:'video'
        }

        searchYouTube(process.env.YOUTUBE_API_KEY, options)
        .then(res =>  {
            return coreLogic(`https://www.youtube.com/watch?v=${res.items[0].id.videoId}`, queue, serverQueue, message, voiceChannel)
          }
        )
        .catch(err =>
          // console.log(`YOUTUBE ERR ${JSON.stringify(err)}`)
          message.channel.send(`Error calling YouTube API. Try again later. \`\`\`${err}\`\`\``)
        )
      } else {
        coreLogic(args[1], queue, serverQueue, message, voiceChannel)
      }
    } catch (error) {
      message.channel.send(`Error  \`\`\`${error.message}\`\`\``);
    }
  }
}
