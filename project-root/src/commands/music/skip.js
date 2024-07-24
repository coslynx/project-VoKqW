const { SlashCommandBuilder } = require('discord.js');
const { musicPlayer } = require('../../utils/musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current song'),
  async execute(interaction) {
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

    // Check if there is a song playing
    if (!musicPlayer.isPlaying()) {
      return interaction.reply({
        content: 'There is no song playing currently!',
        ephemeral: true,
      });
    }

    // Skip the song
    musicPlayer.skipSong();

    await interaction.reply({
      content: `Skipped the current song! Now playing: ${musicPlayer.getCurrentSong().title}`,
      ephemeral: true,
    });
  },
};