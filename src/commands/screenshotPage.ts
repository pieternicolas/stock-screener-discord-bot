import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../interfaces/Command';

export const screenshotPage: Command = {
  data: new SlashCommandBuilder()
    .setName('screenshot')
    .setDescription('Take screenshot of chart')
    .addStringOption((option) =>
      option
        .setName('ticker')
        .setDescription('3-4 letter ticker on stock')
        .setRequired(true)
    ),
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;
    // const text = interaction.options.getString('message', true);

    console.log(user);

    interaction.editReply('ganteng lu bang');
  },
};
