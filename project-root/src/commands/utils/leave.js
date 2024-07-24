const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  leave(interaction) {
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

    // Disconnect from the voice channel
    const connection = getVoiceConnection(interaction.guild.id);
    if (connection) {
      connection.destroy();
    }

    interaction.reply({
      content: 'Leaving the voice channel!',
      ephemeral: true,
    });
  },
};