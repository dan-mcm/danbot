# DanBot

<a href="https://discord.gg/xp7NbBT"><img src="https://discordapp.com/api/guilds/719386778468876378/embed.png" alt="Discord server" /></a>

A Basic Discord Bot written in JS.

Bootstrapped from
* [The Perfect Lil Bot](https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3)
* [Tanner Gabriel's Discord Bot](https://github.com/TannerGabriel/discord-bot)
* [Discordjs Guide](https://discordjs.guide/)

A special mention to the discordjs community accessible for answering queries over on [Discord](https://discord.gg/bRCvFy9).

The bot is accessible in the `Danbot Staging` discord channel accessible [here](https://discord.gg/xp7NbBT).

# Commands & Additional Features

## Helpful Commands

| Command     | Description     |
| :------------- | :------------- |
| !commands | List all available commands |
| !help | Basic info on using the bot     
| !ping | Get latency information |
| !purge | Delete the bots last message(s) from all chats |

## User Control

| Command     | Description     |
| :------------- | :------------- |
| !ban | Ban a player |
| !kick | Kick a user |
| !userinfo | Get information about a user |
| !whitelist | List whitelisted users for shouting out when live on Twitch |
| !whitelistadd  | Delete a Twitch username from the going-live whitelist |
| !whitelistdelete | Delete a Twitch username from the going-live whitelist |

## Playback Control

| Command     | Description     |
| :------------- | :------------- |
| !nowplaying | Get the song that is playing |
| !play | Play a song in your active audio channel e.g. -play some song OR -play youtube-url |
| !queue | Shows the current song queue |
| !skip | Skip a song |
| !stop | Stop all songs in the queue |

## Fun Commands

| Command     | Description     |
| :------------- | :------------- |
| !8ball | Ask the 8ball your question e.g. !8ball will tomorrow be sunny? |
| !gif | Shows a random gif from giphy (general audience rated) |
| !cat | Return a random cat image |
| !dadjoke | If you want to hear some terrible jokes |
| !fortune | Open a fortune cookie |

---
# Twitch Integration

## 🔴 Now Live
The bot can provide going live messages for whitelisted users.

* `NOWLIVE_ANNOUNCEMENTS_ID` controls the channel where live twitch channels are now active

In order to maintain a dynamic updatable whitelist integration with Google Sheets is required.  
This can be configured through the following env variables.

* `WHITELIST_SPREADSHEET_ID`
* `GOOGLE_SERVICE_ACCOUNT_EMAIL`
* `GOOGLE_PRIVATE_KEY`
* `GOOGLE_SPEADSHEET_URL`

To get setup with a google service account follow the [official guidelines](https://developers.google.com/identity/protocols/oauth2/service-account). Be sure to share your Google Spreadsheet to your GOGOEL_SERVICE_ACCOUNT_EMAIL to avoid hitting 401/403 errors.


Note: the bot is currently configured to poll Twitch API on a 3 minute interval (defined by the `TWITCH_POLLING_FREQUENCY` environmental variable so there may be a delay between the time a user goes live and a message is shown. If interested a potential alternative to this implementation is using [Twitchs pub/sub system](https://dev.twitch.tv/docs/pubsub).

---
# Local Setup

## Install & Run

Using yarn during development, should also run fine on npm

```
yarn install
yarn start
```

## Environmental Variables

The following is a list of environmental variables that need to be defined.
A .env config file can be added to run the project locally.

```
# Discord Bot settings
BOT_PREFIX=your-prefix-char
BOT_TOKEN=your-discord-bot-token
EMBED_COLORS=hex-color-for-cards

# The Cat API Key
CAT_API_KEY=your-catapi-key

# Giphy Keys
GIPHY_API_KEY=your-giphy-api-key

# Twitch Config
TWITCH_CLIENT_ID=your-twitch-client-id
TWITCH_CLIENT_SECRET=your-twitch-client-secret
TWITCH_POLLING_FREQUENCY=twitch-polling-frequency

# YouTube Config
YOUTUBE_API_KEY=youtube-api-key

# Channels
NOWLIVE_ANNOUNCEMENTS=now-live
NOWLIVE_ANNOUNCEMENTS_ID=channel-id
WELCOME_CHANNEL=welcome
PLAYLIST_TEXT_CHANNEL=channel-id-name
PLAYLIST_TEXT_CHANNEL_ID=channel-id
PLAYLIST_CHANNEL=channel-id-name
PLAYLIST_VOICE_CHANNEL_ID=channel-id

# Whitelisted Channels
WHITELIST_SPREADSHEET_ID=id-from-spreadsheet-url
GOOGLE_SERVICE_ACCOUNT_EMAIL=serviceaccount-email
GOOGLE_PRIVATE_KEY=google-serviceaccount-privatekey
GOOGLE_SPEADSHEET_URL=direct-spreadsheet-url
```

### Discord Bot Variables

For Discord Bot settings (`BOT_PREFIX`, `BOT_TOKEN`) - check out the handy [discordpy docs](https://discordpy.readthedocs.io/en/latest/discord.html) on how to set up your own Bot application.  
The `EMBED_COLORS` variable is a HEX color used for determining the color of message embeds (cards) sent by the Bot.

* For `WELCOME_CHANNEL` you need to specify a channel name within your discord server to use for new user addition welcome.
* For `NOWLIVE_ANNOUNCEMENTS_ID` see the official Discord [docs](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) on how to get a specific channels channel-id
* For `PLAYLIST_CHANNEL` and `PLAYLIST_VOICE_CHANNEL_ID` see the official Discord [docs](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) on how to get a specific voice channels channel-id
* For `PLAYLIST_TEXT_CHANNEL` and `PLAYLIST_TEXT_CHANNEL_ID` see the official Discord [docs](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) on how to get a specific voice channels channel-id

### Getting API Keys

* For `CAT_API_KEY` you need to [register with TheCatAPI](https://thecatapi.com/) to obtain an API key.
* For `GIPHY_API_KEY` you need to [register with GIPHY](https://developers.giphy.com/) to obtain an API key.  
* For `TWITCH_CLIENT_ID/SECRET` variables check the [Twitch API docs](https://dev.twitch.tv/docs/authentication).
* For `YOUTUBE_API_KEY` you need to [register with Google](https://developers.google.com/youtube/v3/getting-started) to obtain an API key.

## Audio Dependencies

You need ffmpeg installed on your device to successfully have the bot join and translate youtube to audio files.  
You can get the downloadable executables from [here](http://ffmpeg.org/download.html) and should copy the relevant .exe file into this projects directory.

Without it you are likely to encounter the following Error when running any of the playback commands.

```
Error: FFmpeg/avconv not found!
```

# Production Deployment

The Bot is currently configured for deployment on Heroku (as an initial free hosting solution).
There is a nice [medium article](https://medium.com/@mason.spr/hosting-a-discord-js-bot-for-free-using-heroku-564c3da2d23f) on how to deploy your own.

As we are using a .env file to generate global environmental variables, we need to be sure to copy and
paste these values into the applications 'Config Vars' on the Heroku dashboard.

In order to workaround the audio dependencies issues I am trailing the use of .buildpacks to use https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git. Note the ordering of buildpacks is important on your Heroku dashboard, the ffmpeg should be ran first, followed by the nodejs buildpack.

Currently the repo is configured to redeploy the app with any pushes made to the master branch.
In order to review production logs you need to [download & install the heroku cli tooling](https://devcenter.heroku.com/articles/heroku-cli#download-and-install).

```
heroku login
heroku logs -a danbot2020 -t
```

The current bot url is currently accessible at `https://danbot2020.herokuapp.com/` with a `/health` endpoint that returns a 200 OK response.
Note that you need to add your hosting URL as a valid OAuth Redirect URL entry on your registered Twitch application.

Want to temporarily turn off/on the bot?

```
# scale down
heroku ps:scale web=0 -a danbot2020
# scale up
heroku ps:scale web=1 -a danbot2020
```
