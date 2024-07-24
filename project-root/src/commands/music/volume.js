const { SlashCommandBuilder } = require('discord.js');
const { musicPlayer } = require('../../utils/musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Adjusts the volume of the music')
    .addNumberOption((option) =>
      option
        .setName('volume')
        .setDescription('The volume level (0-100)')
        .setRequired(true)
    ),
  async execute(interaction) {
    const volumeLevel = interaction.options.getNumber('volume');

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

    // Check if the volume level is valid
    if (volumeLevel < 0 || volumeLevel > 100) {
      return interaction.reply({
        content: 'Invalid volume level! Please enter a value between 0 and 100.',
        ephemeral: true,
      });
    }

    // Set the volume level
    musicPlayer.setVolume(volumeLevel / 100);

    await interaction.reply({
      content: `Volume set to ${volumeLevel}%!`,
      ephemeral: true,
    });
  },
};