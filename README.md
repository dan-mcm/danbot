# DanBot

A Basic Discord Bot written in JS.

Bootstrapped from
* [The Perfect Lil Bot](https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3)
* [Tanner Gabriel's Discord Bot](https://github.com/TannerGabriel/discord-bot)

---
# Commands

| Command     | Description     |
| :------------- | :------------- |
| !ban | Ban a player |
| !commands | List all available commands |
| !gif | Shows a random gif from giphy (general audience rated) |
| !help | Basic info on using the bot       |
| !kick | Kick a user |
| !ping | Get latency information |
| !purge | Delete the last messages in all chats |
| !userinfo | Get information about a user |
| !nowplaying | Get the song that is playing |
| !play | Play a song in your active audio channel |
| !queue | Shows the current song queue |
| !skip | Skip a song |
| !stop | Stop all songs in the queue |

---

# Local Setup
## Environmental Variables

The following is a list of environmental variables that need to be defined.
A .env config file can be added to run the project locally.

```
BOT_PREFIX: "!",
BOT_TOKEN: "YOUR_TOKEN"
GIPHY_API_KEY="your-api-key"
WELCOME_CHANNEL="channel-you-want-to-welcome-new-users-to"
```

* For prefix & token vars - check out the handy [discordpy docs](https://discordpy.readthedocs.io/en/latest/discord.html) on how to set up your own Bot application.
* For GIPHY_API_KEY you need to register with GIPHY to obtain an API key.  
* For WELCOME_CHANNEL you need to specify a custom within your discord server to use for new user addition welcome.


## Audio Dependencies

You need ffmpeg installed on your device to successfully have the bot join and translate youtube to audio files.  
You can get the downloadable executables from [here](http://ffmpeg.org/download.html) and should copy the relevant .exe file into this projects directory.

Without it you are likely to encounter the following Error when running any of the playback commands.

```
Error: FFmpeg/avconv not found!
```
