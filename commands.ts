import { SlashCommandBuilder } from 'discord.js';

export enum CommandName {
  Create = 'create',
  Assign = 'assign',
  Delete = 'delete',
}

export const commandDefinitions = [
  new SlashCommandBuilder().setName(CommandName.Create).setDescription('Create a task'),
  new SlashCommandBuilder().setName(CommandName.Assign).setDescription('Assign a task'),
  new SlashCommandBuilder().setName(CommandName.Delete).setDescription('Delete a task'),
];
