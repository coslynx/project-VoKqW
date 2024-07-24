const { SlashCommandBuilder } = require('discord.js');
const { musicPlayer } = require('../../utils/musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the current music and clears the queue'),
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

    // Stop the music
    musicPlayer.stopSong();

    await interaction.reply({
      content: 'Stopped the music and cleared the queue!',
      ephemeral: true,
    });
  },
};