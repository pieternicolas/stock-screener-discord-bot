import { Client } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import { CommandList } from '../commands';

export const onReady = async (client: Client) => {
  const rest = new REST({ version: '9' }).setToken(
    process.env.BOT_TOKEN as string
  );

  const commandData = CommandList.map((command) => command.data.toJSON());

  await rest.put(
    Routes.applicationGuildCommands(
      client.user?.id || 'missing id',
      process.env.GUILD_ID as string
    ),
    { body: commandData }
  );

  console.log('Discord ready!');
};
