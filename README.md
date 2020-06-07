# DanBot

A Basic Discord Bot written in JS.

Bootstrapped from
* [The Perfect Lil Bot](https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3)
* [Tanner Gabriel's Discord Bot](https://github.com/TannerGabriel/discord-bot)
* [Discordjs Guide](https://discordjs.guide/)

A special mention to the discordjs community accessible for answering queries over on [Discord](https://discord.gg/bRCvFy9).

---
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

## Playback Control

| Command     | Description     |
| :------------- | :------------- |
| !nowplaying | Get the song that is playing |
| !play | Play a song in your active audio channel |
| !queue | Shows the current song queue |
| !skip | Skip a song |
| !stop | Stop all songs in the queue |

## Fun Commands

| Command     | Description     |
| :------------- | :------------- |
| !8ball | Ask the 8ball your question e.g. !8ball will tomorrow be sunny? |
| !gif | Shows a random gif from giphy (general audience rated) |

---
# Twitch Integration

## 🔴 Now Live
The bot can provide going live messages for whitelisted users based on the following env Variables
* `NOWLIVE_ANNOUNCEMENTS_ID` controls the channel where live twitch channels are now active
* `TWITCH_CHANNELS` controls which twitch channels are monitored for live status. This is a defined as a comma delimited string

Note: the bot is currently configured to poll Twitch API on a 60second interval (defined by the `TWITCH_POLLING_FREQUENCY` environmental variable so there may be a delay between the time a user goes live and a message is shown. If interested a potential alternative to this implementation is using [Twitchs pub/sub system](https://dev.twitch.tv/docs/pubsub).

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

# Giphy Keys
GIPHY_API_KEY=your-giphy-api-key

# Twitch Config
TWITCH_CLIENT_ID=your-twitch-client-id
TWITCH_CLIENT_SECRET=your-twitch-client-secret
TWITCH_CHANNELS=comma-deliminated-list-of-channels-to-track-going-live
TWITCH_POLLING_FREQUENCY="60000"

# Channels
NOWLIVE_ANNOUNCEMENTS=now-live
NOWLIVE_ANNOUNCEMENTS_ID=channel-id
WELCOME_CHANNEL=welcome
```

### Discord Bot Variables

For Discord Bot settings (`BOT_PREFIX`, `BOT_TOKEN`) - check out the handy [discordpy docs](https://discordpy.readthedocs.io/en/latest/discord.html) on how to set up your own Bot application.

* For `WELCOME_CHANNEL` you need to specify a channel name within your discord server to use for new user addition welcome.
* For `NOWLIVE_ANNOUNCEMENTS_ID` see the official Discord [docs](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) on how to get a specific channels channel-id

### Getting API Keys

* For `GIPHY_API_KEY` you need to [register with GIPHY](https://developers.giphy.com/) to obtain an API key.  
* For `TWITCH_CLIENT_ID/SECRET` variables check the [Twitch API docs](https://dev.twitch.tv/docs/authentication)

## Audio Dependencies

You need ffmpeg installed on your device to successfully have the bot join and translate youtube to audio files.  
You can get the downloadable executables from [here](http://ffmpeg.org/download.html) and should copy the relevant .exe file into this projects directory.

Without it you are likely to encounter the following Error when running any of the playback commands.

```
Error: FFmpeg/avconv not found!
```
