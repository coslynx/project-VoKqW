const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows all available commands'),
  async execute(interaction) {
    await interaction.reply({
      content: '```\n/play <url> - Plays music from a YouTube URL\n/pause - Pauses the currently playing song\n/skip - Skips the current song\n/stop - Stops the current music and clears the queue\n/queue - Shows the current music queue\n/volume <volume> - Adjusts the volume of the music (0-100)\n/nowplaying - Shows the currently playing song\n/seek <time> - Seek to a specific point in the current song (e.g., 0:30, 1:15)\n```',
      ephemeral: true,
    });
  },
};