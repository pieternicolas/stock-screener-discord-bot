import { SlashCommandBuilder } from '@discordjs/builders';
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
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;
    const text = interaction.options.getString('message', true);

    console.log(text, user);

    interaction.editReply('ganteng lu bang');
  },
};
