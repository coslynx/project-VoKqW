const { VoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice');
const { joinVoiceChannel } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const { createAudioResource } = require('@discordjs/voice');
const { StreamType } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { getVoiceConnection } = require('@discordjs/voice');
const { getAudioPlayer } = require('@discordjs/voice');
const search = require('./search');
const musicHandler = require('./musicHandler');

let connection = null;
let player = null;
let queue = [];
let currentSong = null;

const init = () => {
  // Initialize the music player
  console.log('Music player initialized!');
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

  // Queue the song
  queue.push({
    title: title,
    artist: artist,
    stream: stream,
  });

  // Play the next song
  playNextSong(interaction);
};

const playNextSong = (interaction) => {
  // Check if there are any songs in the queue
  if (queue.length === 0) {
    // If the queue is empty, leave the voice channel
    connection.destroy();
    connection = null;
    player = null;
    return;
  }

  // Get the next song from the queue
  currentSong = queue.shift();

  // Create an audio resource
  const resource = createAudioResource(currentSong.stream, {
    inputType: StreamType.Opus,
  });

  // Play the song
  player.play(resource);

  // Connect the player to the voice connection
  connection.subscribe(player);

  // Handle the end of the song
  player.on(VoiceConnectionStatus.Ready, () => {
    console.log('Player is ready');
  });

  player.on('finish', () => {
    // Remove the song from the queue
    queue.shift();

    // Play the next song
    playNextSong(interaction);
  });

  player.on('error', (error) => {
    console.error(error);
    interaction.reply({
      content: `Error playing music: ${error.message}`,
      ephemeral: true,
    });
  });
};

const pauseSong = () => {
  if (player && player.playing) {
    player.pause();
  }
};

const resumeSong = () => {
  if (player && player.paused) {
    player.unpause();
  }
};

const skipSong = () => {
  if (player && player.playing) {
    player.stop();
  }
};

const stopSong = () => {
  if (player && player.playing) {
    player.stop();
    queue = [];
  }
};

const getQueue = () => {
  return queue;
};

const getCurrentSong = () => {
  return currentSong;
};

const isPlaying = () => {
  return player && player.playing;
};

const setVolume = (volumeLevel) => {
  if (player && player.playing) {
    if (volumeLevel < 0 || volumeLevel > 100) {
      return;
    }
    player.volume = volumeLevel / 100;
  }
};

const seek = (seekTo) => {
  if (player && player.playing) {
    player.pause();
    player.seek(seekTo);
    player.unpause();
  }
};

module.exports = {
  init,
  playSong,
  pauseSong,
  resumeSong,
  skipSong,
  stopSong,
  getQueue,
  getCurrentSong,
  isPlaying,
  setVolume,
  seek,
};