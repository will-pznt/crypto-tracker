import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Coin } from '../models/crypto.model';

export const CryptoActions = createActionGroup({
  source: 'Crypto',
  events: {
    'Load Coins': emptyProps(),
    'Load Coins Success': props<{ coins: Coin[] }>(),
    'Load Coins Failure': props<{ error: string }>(),
    'Toggle Favorite': props<{ id: string }>(),
  },
});
