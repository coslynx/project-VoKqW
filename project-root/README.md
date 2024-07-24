# Discord Music Bot

This repository contains the code for a Discord music bot built using Node.js and Discord.js. The bot allows users to listen to music with friends and community members within Discord servers.

## Features

* **Music Playback:**
    * Play music from YouTube, Spotify, SoundCloud, and other supported sources.
    * Control playback (play, pause, skip, stop, volume control, seek).
* **Voice Commands:**
    * Control music playback with voice commands.
* **Music Queue:**
    * Create a queue of songs to play continuously.
    * Manage the queue (add, remove, clear, reorder songs).
* **Playlist Creation:**
    * Create and save custom playlists.
    * Share playlists with other users.
* **Integration with Other Services:**
    * Authenticate Spotify accounts and play music from Spotify libraries.
    * Seamless playback of YouTube videos.
    * Support for other popular music streaming services (coming soon).

## Getting Started

1. **Install Node.js:**
    * Download and install Node.js from [https://nodejs.org/](https://nodejs.org/).

2. **Clone the Repository:**
    * Clone this repository to your local machine:
        ```bash
        git clone https://github.com/your-username/discord-music-bot.git
        ```

3. **Install Dependencies:**
    * Navigate to the project directory and install the necessary packages:
        ```bash
        npm install
        ```

4. **Create a `.env` File:**
    * Create a file named `.env` in the project root directory.
    * Add the following environment variables:
        ```
        DISCORD_TOKEN=YOUR_BOT_TOKEN
        // (Optional) MongoDB database URL
        MONGODB_URI=mongodb://localhost:27017/your-database-name
        // (Optional) Spotify API credentials
        SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
        SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
        ```

5. **Start the Bot:**
    * Run the bot using the following command:
        ```bash
        node index.js
        ```

## Usage

* **Join a Voice Channel:** Use the `!join` command to make the bot join the voice channel you are in.
* **Play Music:** Use the `!play` command followed by a song URL (e.g., `!play https://www.youtube.com/watch?v=dQw4w9WgXcQ`).
* **Control Playback:** Use commands like `!pause`, `!resume`, `!skip`, `!stop`, `!volume`, and `!seek` to control the music.
* **View the Queue:** Use the `!queue` command to see the current list of songs in the queue.
* **View Current Song:** Use the `!nowplaying` command to see the currently playing song.
* **Help:** Use the `!help` command to get a list of available commands and features.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License.