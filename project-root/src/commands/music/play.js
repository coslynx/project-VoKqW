const { SlashCommandBuilder } = require('discord.js');
const { musicPlayer } = require('../../utils/musicPlayer');
const ytsr = require('ytsr');
const ytdl = require('ytdl-core');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays music from a YouTube URL')
    .addStringOption((option) =>
      option.setName('url').setDescription('The YouTube URL').setRequired(true)
    ),
  async execute(interaction) {
    const url = interaction.options.getString('url');

    // Check if the bot is in a voice channel
    if (!interaction.guild.members.me.voice.channel) {
      return interaction.reply({
        content: 'I am not in a voice channel!',
        ephemeral: true,
      });
    }

    // Check if the user is in a voice channel
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: 'You need to be in a voice channel to use this command!',
        ephemeral: true,
      });
    }

    // Search for the song on YouTube
    try {
      const searchResults = await ytsr(url);
      const video = searchResults.items[0];

      if (!video) {
        return interaction.reply({
          content: `Could not find a video for ${url}`,
          ephemeral: true,
        });
      }

      // Start playing the song
      const stream = ytdl(video.url, { filter: 'audioonly' });

      musicPlayer.playSong(interaction, stream, video.title, video.author.name);

      await interaction.reply({
        content: `Now playing: ${video.title}!`,
        ephemeral: true,
      });
    } catch (err) {
      console.error(err);
      return interaction.reply({
        content: `Error playing music: ${err.message}`,
        ephemeral: true,
      });
    }
  },
};