const { SlashCommandBuilder } = require('discord.js');
const { musicPlayer } = require('../../utils/musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Shows the current music queue'),
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

    const queue = musicPlayer.getQueue();

    // Check if the queue is empty
    if (queue.length === 0) {
      return interaction.reply({
        content: 'The queue is empty!',
        ephemeral: true,
      });
    }

    let queueString = 'Current queue:\n';

    // Format the queue message
    for (let i = 0; i < queue.length; i++) {
      queueString += `${i + 1}. ${queue[i].title} by ${queue[i].artist}\n`;
    }

    await interaction.reply({
      content: queueString,
      ephemeral: true,
    });
  },
};