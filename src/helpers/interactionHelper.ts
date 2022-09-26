import { CommandInteraction, CommandInteractionOption } from 'discord.js';

export const getInteractionData = (
  interactionData: readonly CommandInteractionOption[],
  interactionName: CommandInteractionOption['name']
): CommandInteractionOption | undefined => {
  return interactionData.find((data) => {
    return data.name === interactionName;
  });
};
