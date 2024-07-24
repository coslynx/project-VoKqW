const { Client, IntentsBitField } = require('discord.js');
const { token } = require('./config');
const logger = require('./logger');
const handleCommand = require('./events/messageCreate');
const handleInteraction = require('./events/interactionCreate');
const handleReady = require('./events/ready');
const handleVoiceStateUpdate = require('./events/voiceStateUpdate');
const musicPlayer = require('./utils/musicPlayer');
const musicHandler = require('./utils/musicHandler');
const voice = require('./utils/voice');

// Create a new Discord client instance
const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildVoiceStates] });

// Set up event listeners
client.on('ready', handleReady);
client.on('messageCreate', handleCommand);
client.on('interactionCreate', handleInteraction);
client.on('voiceStateUpdate', handleVoiceStateUpdate);

// Login to Discord
client.login(token)
  .then(() => {
    logger.info(`Bot is online!`);
  })
  .catch((err) => {
    logger.error(`Error while logging in: ${err}`);
  });

// Initialize the music player
musicPlayer.init();

// Initialize the music handler
musicHandler.init();

// Initialize the voice manager
voice.init(client);