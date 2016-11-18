# FCC_twitch_viewer


## FreeCodeCamp Zipline: Use the Twitch.tv JSON API
[Project description](https://www.freecodecamp.com/challenges/use-the-twitchtv-json-api)

## User Stories (MVP)
- __[TODO]__ I can see whether Free Code Camp is currently streaming on Twitch.tv.
- __[TODO]__ I can click the status output and be sent directly to the Free Code Camp Twitch.tv channel.
- __[TODO]__ If a Twitch user is currently streaming, I can see additional details about what they are streaming.
- __[TODO]__ I will see a placeholder notification if a streamer has closed their Twitch account (or the account never existed). Verify this works by adding _brunofin_ and _comster404_ to your array of Twitch streamers.

### Notes:
- Request data from stream object to get everything done in a single call.
- If channel is dead,  regex username and adjust the corresponding viewer element.
- If channel is alive but not streaming (stream null), do nothing.
- If channel is alive and streaming, grab id from displayName, and refresh the corresponding viewer element.
