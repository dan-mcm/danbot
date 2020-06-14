const Discord = require('discord.js')
const axios = require('axios')
const searchYouTube = require("youtube-api-v3-search");

function formatYouTubeCardEmbed(title, description, videoId, image){
  return new Discord.MessageEmbed()
    .setColor(process.env.EMBED_COLORS)
    .setTitle(title)
    .setURL(`https://www.youtube.com/watch?v=${videoId}`)
    // .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
    .setDescription(description)
    .setImage(image)
    .setTimestamp()
}

function pollingLatestVideos(client){
  console.log('Polling YouTube Videos...')

  // hack with hardcoded channel id - need an automated way to get it...
  const channel = client.channels.cache.get(process.env.YOUTUBE_ANNOUNCEMENTS_ID);

  const options = {
    channelId: process.env.YOUTUBE_CHANNEL_ID,
    part:'snippet',
    type:'video',
    maxResults: '10',
    order: 'date'
  }

  searchYouTube(process.env.YOUTUBE_API_KEY, options)
  .then(res =>  {

      res.items.map(upload => {
          let currentDateTime = (new Date()).toISOString()
          let minutesAgoStarted = Math.floor(new Date(currentDateTime) - new Date(upload.snippet.publishTime)) / 60000
          let threshold = 50000000 // placeholder

          // if video was uploaded in the last hour...
          if(minutesAgoStarted < 60){
            channel.send(
              `🎬 @everyone new YouTube video uploaded - https://www.youtube.com/watch?v=${upload.id.videoId}.`,
              formatYouTubeCardEmbed(
                upload.snippet.title,
                upload.snippet.description,
                upload.id.videoId,
                upload.snippet.thumbnails.high.url
              )
            )
          }
        }
      )
    }
  )
  .catch(err => console.log(err))
}

module.exports = pollingLatestVideos
