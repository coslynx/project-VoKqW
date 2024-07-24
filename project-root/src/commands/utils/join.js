const { joinVoiceChannel } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  join(interaction) {
    // Check if the bot is already in a voice channel
    if (interaction.guild.members.me.voice.channel) {
      return interaction.reply({
        content: 'I am already in a voice channel!',
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

    // Join the user's voice channel
    joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    interaction.reply({
      content: `Joined ${interaction.member.voice.channel.name}!`,
      ephemeral: true,
    });
  },
};