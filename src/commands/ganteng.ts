import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { getInteractionData } from '../helpers/interactionHelper';
import { Command } from '../interfaces/Command';

export const testGanteng: Command = {
  data: new SlashCommandBuilder()
    .setName('ganteng')
    .setDescription('aku ganteng')
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('message test?')
        .setRequired(true)
    ),
  run: async (interaction: CommandInteraction) => {
    await interaction.deferReply();
    const { user } = interaction;
    const text = interaction.commandName === 'ganteng';
    const message = getInteractionData(interaction.options.data, 'message');

    interaction.editReply(
      `From user: ${user.username}. Message: ${message?.value}`
    );
  },
};
