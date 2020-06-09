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
}

function checkingNowLive(data,client){
  if(data.length==0){
    return null
  } else {
    let filteredStreamerInfo = data.data.map(
      ({user_name, title, started_at, viewer_count, thumbnail_url, game_id, user_id}) =>
      ({user_name, title, started_at, viewer_count, thumbnail_url, game_id, user_id})
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
      // note for later -> abstract token call outside this promise then pass into the two functions, prevent duplicating calls
      Promise.all(
        [
          gameIDConversion(streamer.game_id),
          streamersProfilePicConversion(streamer.user_id)
        ]
      ).then(
        res =>
        {
          // some custom logic in case the profilepics arent found, can be better error handled
          // similar logic shoudl be in place for gameIDConversion for safety
          let avatarImage = ""
          if (res[1].data.length > 0){
             avatarImage = res[1].data[0].profile_image_url
           }
          // hacky way to limit our posting to streams that only started within the last x minutes (based on polling frequency)
          let minutesAgoStarted = Math.floor(new Date(currentDateTime) - new Date(streamer.started_at)) / 60e3
          // using 2 minutes as our hardcoded threshold
          if(minutesAgoStarted < 2){
            return channel.send('@everyone' + `, **${streamer.user_name}** - https://www.twitch.com/${streamer.user_name} - is now live!`, formatLiveCardEmbed(streamer, res[0], avatarImage))
          }
        }
      ).catch(
        err =>
        console.log(err)
      )
    }
  )
  // return channel.send(`Somebody went live! ${JSON.stringify(data)}`);
}

function formatLiveCardEmbed(streamer, game_name, streamer_avatar){
  return new Discord.MessageEmbed()
    .setColor('#6441a5')
    .setTitle(`🔴 **${streamer.user_name}** is Now Live!`)
    .setURL(`https://www.twitch.com/${streamer.user_name}`)
    // .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
    .setDescription(streamer.title)
    .setThumbnail(streamer_avatar)
    .addFields(
      // need to hit giantbomb api to translate game_id to a name
      { name: 'Currently Playing', value: game_name, inline: true },
      { name: 'Viewers', value: streamer.viewer_count, inline: true }
    )
    .setImage(streamer.thumbnail_url.replace("{width}", "700").replace("{height}", "400"))
    .setTimestamp()
}

function gameIDConversion(id){
  return getTwitchBearerToken()
  .then(token =>
    getGameName(id,token)
  )
  .catch(error =>
    console.log(error)
  )
}

function getGameName(id, token){
  const headers = {
    Authorization: `Bearer ${token}`,
    'client-id': process.env.TWITCH_CLIENT_ID
  };
  const params = { id };
  return axios.get('https://api.twitch.tv/helix/games', {
    headers,
    params
  })
  .then(gamedata =>
    gamedata.data.data[0].name
  )
  .catch(err =>
    console.log(err)
  )
}

function streamersProfilePicConversion(user_id){
  return getTwitchBearerToken()
  .then(token =>
    getStreamersProfilePic(user_id,token)
  )
  .catch(error =>
    console.log(error)
  )
}
 function getStreamersProfilePic(user_id, token){
  const headers = {
    Authorization: `Bearer ${token}`,
    'client-id': process.env.TWITCH_CLIENT_ID
  };
  const params = { id: user_id };
  return axios.get(
    `https://api.twitch.tv/helix/users`,
    {
      headers,
      params
    }
  ).then(streamerData =>
    // appears temperatmental - keep getting data[] results...
    streamerData.data
  )
  .catch(err =>
    console.log(err)
  )
}

function pollingCurrentlyLive(client){
  console.log('Polling Twitch - Currently Live...')
  return getTwitchBearerToken()
    .then(token => checkWhitelistedChannels(token, client))
    .then(channels => checkingNowLive(channels.data, client))
    .catch(err => console.log(err))
}

module.exports = pollingCurrentlyLive
