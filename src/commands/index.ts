import { Command } from 'src/interfaces/Command';
import { testGanteng } from './ganteng';
import { checkStockPriceTemplate } from './stocks';

export const CommandList: Command[] = [testGanteng, checkStockPriceTemplate];
