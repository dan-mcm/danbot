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
## Discord Config

A config.json file needs to be included to pull your Discord Application Credentials.  
Check out the handy [discordpy docs](https://discordpy.readthedocs.io/en/latest/discord.html) on how to set up your own Bot application.

```
{
    "prefix": "!",
    "token": "YOUR_TOKEN"
}
```

## Audio Dependencies

You need ffmpeg installed on your device to successfully have the bot join and translate youtube to audio files.  
You can get the downloadable executables from [here](http://ffmpeg.org/download.html) and should copy the relevant .exe file into this projects directory.

Without it you are likely to encounter the following Error when running any of the playback commands.

```
Error: FFmpeg/avconv not found!
```

## GIPHY dependencies

You need to register with GIPHY to obtain an API key.  
This key should be added to a .env file in the root of the project

```
GIPHY_API_KEY="your-api-key"
```
