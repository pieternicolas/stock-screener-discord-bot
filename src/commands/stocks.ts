import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import yahooFinance from 'yahoo-finance2';
import dayjs from 'dayjs';

import { getInteractionData } from '../helpers/interactionHelper';
import { Command } from '../interfaces/Command';
import { usernameCheck } from '../helpers/usernameCheck';
import { formatter } from '../helpers/priceFormat';

export const checkStockPriceTemplate: Command = {
  data: new SlashCommandBuilder()
    .setName('checkstock')
    .setDescription('Check single stock price by ticket')
    .addStringOption((option) =>
      option
        .setName('ticker')
        .setDescription('Ticker for stock price (e.g. BBCA)')
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName('buy_price')
        .setDescription('Buy price to get in')
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName('take_profit')
        .setDescription('Take profit price stage 1')
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName('cutloss')
        .setDescription('Cutloss price')
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName('take_profit2')
        .setDescription('Take profit price stage 2')
        .setRequired(false)
    ),
  run: async (interaction: CommandInteraction) => {
    await interaction.deferReply();
    const { user } = interaction;
    const nicknameOfUser = usernameCheck(user.id);

    const ticker = getInteractionData(interaction.options.data, 'ticker');
    const buyPrice = Number(
      getInteractionData(interaction.options.data, 'buy_price')?.value
    );
    const takeProfit = Number(
      getInteractionData(interaction.options.data, 'take_profit')?.value
    );
    const takeProfit2 = Number(
      getInteractionData(interaction.options.data, 'take_profit2')?.value
    );
    const cutloss = Number(
      getInteractionData(interaction.options.data, 'cutloss')?.value
    );

    const quote = await yahooFinance.quote(`${ticker?.value}.JK`);
    const {
      regularMarketPrice,
      longName,
      regularMarketChangePercent,
      regularMarketChange,
    } = quote;
    const price = Number(regularMarketPrice);

    const profitPercentage = (
      ((takeProfit - buyPrice) / buyPrice) *
      100
    ).toFixed(2);
    const cutlossPercentage = (((cutloss - buyPrice) / buyPrice) * 100).toFixed(
      2
    );
    const ratio = Math.abs(
      Number(profitPercentage) / Number(cutlossPercentage)
    ).toFixed(2);
    const marketChangePercentage =
      Number(regularMarketChangePercent) > 0
        ? `+ ${Number(regularMarketChangePercent).toFixed(2)}`
        : `- ${Number(regularMarketChangePercent).toFixed(2)}`;
    const marketChange =
      Number(regularMarketChange) > 0
        ? `+ ${Number(regularMarketChange).toFixed(2)}`
        : `- ${Number(regularMarketChange).toFixed(2)}`;

    interaction.editReply(
      `
      **[${ticker?.value}](https://www.google.com/finance/quote/${
        ticker?.value
      }:IDX) - ${longName} (${marketChangePercentage}%, ${marketChange})**
Buy Price : ${formatter.format(buyPrice)}
Current Price : ${formatter.format(price)}

TP 1 : ${formatter.format(takeProfit)}
TP 2 : ${formatter.format(takeProfit2)}
Cutloss : ${formatter.format(cutloss)}
Profit % : ${profitPercentage}% (Based on TP 1)
Loss % : ${cutlossPercentage}%
Ratio Cuan : ${ratio} (Profit % : Loss %)

Created by: ${nicknameOfUser?.name} [${dayjs().format('DD MMM YYYY')}]
      `
    );
  },
};
