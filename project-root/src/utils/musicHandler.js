const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, getVoiceConnection, getAudioPlayer } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

let connection = null;
let player = null;
let queue = [];
let currentSong = null;

const init = () => {
  // Initialize the music handler
  console.log('Music handler initialized!');
};

const addToQueue = (interaction, stream, title, artist) => {
  queue.push({
    title: title,
    artist: artist,
    stream: stream,
  });

  if (!player.playing) {
    playNextSong(interaction);
  }
};

const playNextSong = (interaction) => {
  if (queue.length === 0) {
    return;
  }

  currentSong = queue.shift();

  const resource = createAudioResource(currentSong.stream, {
    inputType: StreamType.Opus,
  });

  player.play(resource);

  interaction.reply({
    content: `Now playing: ${currentSong.title} by ${currentSong.artist}!`,
    ephemeral: true,
  });
};

const skipSong = (interaction) => {
  if (!player.playing) {
    return interaction.reply({
      content: 'There is no song playing currently!',
      ephemeral: true,
    });
  }

  player.stop();
  interaction.reply({
    content: `Skipped the current song!`,
    ephemeral: true,
  });
};

const stopSong = (interaction) => {
  if (!player.playing) {
    return interaction.reply({
      content: 'There is no song playing currently!',
      ephemeral: true,
    });
  }

  player.stop();
  queue = [];
  interaction.reply({
    content: 'Stopped the music and cleared the queue!',
    ephemeral: true,
  });
};

const getQueue = () => {
  return queue;
};

const getCurrentSong = () => {
  return currentSong;
};

const setVolume = (interaction, volumeLevel) => {
  if (!player.playing) {
    return interaction.reply({
      content: 'There is no song playing currently!',
      ephemeral: true,
    });
  }

  if (volumeLevel < 0 || volumeLevel > 100) {
    return interaction.reply({
      content: 'Invalid volume level! Please enter a value between 0 and 100.',
      ephemeral: true,
    });
  }

  player.volume = volumeLevel / 100;
  interaction.reply({
    content: `Volume set to ${volumeLevel}%!`,
    ephemeral: true,
  });
};

module.exports = {
  init,
  addToQueue,
  playNextSong,
  skipSong,
  stopSong,
  getQueue,
  getCurrentSong,
  setVolume,
};