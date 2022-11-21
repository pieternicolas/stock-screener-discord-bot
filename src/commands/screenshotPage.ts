import { SlashCommandBuilder } from '@discordjs/builders';
import puppeteer from 'puppeteer';
import { getInteractionData } from 'src/helpers/interactionHelper';
import { Command } from 'src/interfaces/Command';

const grabPage = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const el = await page.$('#contents');
  const buffer = await el?.screenshot({ path: `${Date.now()}.png` });

  await browser.close();
  return buffer;
};

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
    const ticker = getInteractionData(interaction.options.data, 'ticker');

    console.log(user);

    const buffer = await grabPage('https://youtube.com');
    console.log(buffer, 'buffer');

    interaction.editReply(`${ticker?.value}`);
  },
};
