import path from 'node:path';
import { config } from 'dotenv';
import { Client, Events, GatewayIntentBits, REST, Routes } from 'discord.js';
import { commandDefinitions, CommandName } from './commands.js';

config({ path: path.resolve(process.cwd(), '.env') });

const token = process.env.TOKEN ?? process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;

if (!token) {
  throw new Error('TOKEN (or BOT_TOKEN) is not set in the environment.');
}

if (!clientId) {
  throw new Error('CLIENT_ID is not set in the environment.');
}

const commands = commandDefinitions;

const rest = new REST().setToken(token);

await rest.put(Routes.applicationCommands(clientId), { body: commands });

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === CommandName.Create) {
    await interaction.reply('task created');
    return;
  }

  if (interaction.commandName === CommandName.Assign) {
    await interaction.reply('task assigned');
    return;
  }

  if (interaction.commandName === CommandName.Delete) {
    await interaction.reply('task deleted');
  }
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);
