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
function checkWhitelistedChannels(token){
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

  axios.get('https://api.twitch.tv/helix/streams', {
    headers,
    params
  })
  .then(data => {
    console.log(data.data)
    }
  )
  .catch(err =>
    console.log(err)
  )
}

function pollingCurrentlyLive(){
  return getTwitchBearerToken()
    .then(token =>
      checkWhitelistedChannels(token)
    )
    .catch(err =>
    console.log(err)
  )
}

module.exports = pollingCurrentlyLive
