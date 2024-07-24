const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, getVoiceConnection, getAudioPlayer } = require('@discordjs/voice');

let connection = null;
let player = null;

const joinVoice = async (interaction) => {
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
  connection = joinVoiceChannel({
    channelId: interaction.member.voice.channel.id,
    guildId: interaction.guild.id,
    adapterCreator: interaction.guild.voiceAdapterCreator,
  });

  interaction.reply({
    content: `Joined ${interaction.member.voice.channel.name}!`,
    ephemeral: true,
  });
};

const leaveVoice = async (interaction) => {
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
  if (connection) {
    connection.destroy();
  }

  interaction.reply({
    content: 'Leaving the voice channel!',
    ephemeral: true,
  });
};

const playSong = async (interaction, stream, title, artist) => {
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

  // Join the user's voice channel
  connection = joinVoiceChannel({
    channelId: interaction.member.voice.channel.id,
    guildId: interaction.guild.id,
    adapterCreator: interaction.guild.voiceAdapterCreator,
  });

  // Create an audio player
  player = createAudioPlayer();

  // Create an audio resource
  const resource = createAudioResource(stream, {
    inputType: StreamType.Opus,
  });

  // Play the song
  player.play(resource);

  // Connect the player to the voice connection
  connection.subscribe(player);

  // Handle the end of the song
  player.on('finish', () => {
    // Remove the song from the queue
    // queue.shift();
    
    // Play the next song
    // playNextSong(interaction);
  });

  player.on('error', (error) => {
    console.error(error);
    interaction.reply({
      content: `Error playing music: ${error.message}`,
      ephemeral: true,
    });
  });

  interaction.reply({
    content: `Now playing: ${title} by ${artist}!`,
    ephemeral: true,
  });
};

const pauseSong = async (interaction) => {
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

  // Check if a song is playing
  if (!player.playing) {
    return interaction.reply({
      content: 'There is no song playing currently!',
      ephemeral: true,
    });
  }

  // Pause the song
  player.pause();

  interaction.reply({
    content: 'Paused the music!',
    ephemeral: true,
  });
};

const resumeSong = async (interaction) => {
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

  // Check if a song is paused
  if (!player.paused) {
    return interaction.reply({
      content: 'The music is not paused!',
      ephemeral: true,
    });
  }

  // Resume the song
  player.unpause();

  interaction.reply({
    content: 'Resumed the music!',
    ephemeral: true,
  });
};

const stopSong = async (interaction) => {
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
  if (player) {
    player.stop();
  }

  if (connection) {
    connection.destroy();
    connection = null;
  }

  interaction.reply({
    content: 'Stopped the music!',
    ephemeral: true,
  });
};

const setVolume = async (interaction, volumeLevel) => {
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

  // Check if a song is playing
  if (!player.playing) {
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
  player.volume = volumeLevel / 100;

  interaction.reply({
    content: `Volume set to ${volumeLevel}%!`,
    ephemeral: true,
  });
};

const skipSong = async (interaction) => {
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

  // Check if a song is playing
  if (!player.playing) {
    return interaction.reply({
      content: 'There is no song playing currently!',
      ephemeral: true,
    });
  }

  // Skip the song
  player.stop();

  interaction.reply({
    content: `Skipped the current song!`,
    ephemeral: true,
  });
};

module.exports = {
  joinVoice,
  leaveVoice,
  playSong,
  pauseSong,
  resumeSong,
  stopSong,
  setVolume,
  skipSong,
};