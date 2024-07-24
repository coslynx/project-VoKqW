const { SlashCommandBuilder } = require('discord.js');
const { musicPlayer } = require('../../utils/musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Shows the currently playing song'),
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

    const currentSong = musicPlayer.getCurrentSong();

    await interaction.reply({
      content: `Now playing: **${currentSong.title}** by **${currentSong.artist}**`,
      ephemeral: true,
    });
  },
};