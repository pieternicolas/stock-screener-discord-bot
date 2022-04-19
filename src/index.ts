import { Client } from 'discord.js';
import { CommandList } from './commands';
import { IntentOptions } from './config/IntentOptions';
import { onReady } from './events/onReady';

(async () => {
  const client = new Client({ intents: IntentOptions });

  client.on('ready', async () => {
    console.log(`Logged in as ${client?.user?.tag}!`);
    await onReady(client);
  });

  // client.on('messageCreate', async (msg) => {
  //   console.log(msg.content);

  //   if (msg.content === 'ping') {
  //     msg.reply('pong');
  //   }
  // });

  client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
      for (const Command of CommandList) {
        if (interaction.commandName === Command.data.name) {
          await Command.run(interaction);
          break;
        }
      }
    }
  });

  await client.login(process.env.BOT_TOKEN);
})();
