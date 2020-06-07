// at the top of your file
const Discord = require('discord.js');

const axios = require('axios')

// get Twitch Bearer token
function getTwitchBearerToken() {
  return axios.post("https://id.twitch.tv/oauth2/token", null, {
        params: {
            client_id: process.env.TWITCH_CLIENT_ID,
            client_secret: process.env.TWITCH_CLIENT_SECRET,
            grant_type: "client_credentials"
          }
        }
      )
      .then(data => data.data.access_token)
      .catch(err => console.log(`Error fetching token: ${err}`))
}

// calling Twitch api checking what streamers are active based on env variable list of whitelisted users
function checkWhitelistedChannels(token,client){
  const headers = {
    Authorization: `Bearer ${token}`,
    'client-id': process.env.TWITCH_CLIENT_ID
  };

  // future logic could change the channels to match all those from users in the channel maybe?
  // would be more efficient to automate this than keep a whielisted settings
  // on other hand you want to control the spam in the live channels surely incase nsfw or others present
  const params = {
     user_login: process.env.TWITCH_CHANNELS.split(',')
  };

  return axios.get('https://api.twitch.tv/helix/streams', {
    headers,
    params
  })
  .then(data =>
    checkingNowLive(data.data,client)
  )
  .catch(err =>
    console.log(err)
  )
}

function checkingNowLive(data,client){
  if(data.length==0){
    return null
  } else {
    // filtering to just keep the values we want
    let filteredStreamerInfo = data.data.map(
      ({user_name, title, started_at, viewer_count, thumbnail_url, game_id}) =>
      ({user_name, title, started_at, viewer_count, thumbnail_url, game_id})
    )
    return sendingChannelUpdates(filteredStreamerInfo,client)
  }
}

function sendingChannelUpdates(data, client){

  // hack with hardcoded channel id - need an automated way to get it...
  const channel = client.channels.cache.get(process.env.NOWLIVE_ANNOUNCEMENTS_ID);
  if (!channel) return;
  // Twitch uses rfc3339 time formatting so getting the current timestamp in that format
  let currentDateTime = (new Date()).toISOString()
  return data.map(
    streamer =>
    {
      // hacky way to limit our posting to streams that only started within the last x minutes (based on polling frequency)
      let minutesAgoStarted = Math.floor(new Date(currentDateTime) - new Date(streamer.started_at)) / 60e3
      if(minutesAgoStarted < (process.env.TWITCH_POLLING_FREQUENCY/60000)){
        return channel.send(formatLiveCardEmbed(streamer))
      }
    }
  )
  // return channel.send(`Somebody went live! ${JSON.stringify(data)}`);
}

function formatLiveCardEmbed(streamer){
  return new Discord.MessageEmbed()
    .setColor('#6441a5')
    .setTitle(`🔴 **${streamer.user_name}** is Now Live!`)
    .setURL(`https://www.twitch.com/${streamer.user_name}`)
    // .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
    .setDescription(streamer.title)
    .setThumbnail(streamer.thumbnail_url)
    .addFields(
      // need to hit giantbomb api to translate game_id to a name
      { name: 'Currently Playing', value: streamer.game_id, inline: true },
      { name: 'Viewers', value: streamer.viewer_count, inline: true },
      // could add custom parsing to make better human readble
      { name: 'Time Started', value: streamer.started_at, inline: true }
    )
    .setImage(streamer.thumbnail_url.replace("{width}", "700").replace("{height}", "400"))
    .setTimestamp()
}

function pollingCurrentlyLive(client){
  return getTwitchBearerToken()
    .then(token =>
      checkWhitelistedChannels(token,client)
    )
    .catch(err =>
    console.log(err)
  )
}

module.exports = pollingCurrentlyLive
