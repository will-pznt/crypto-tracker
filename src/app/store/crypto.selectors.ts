import { createSelector } from '@ngrx/store';
import { cryptoFeature } from './crypto.reducer';

export const { selectCoins, selectFavorites, selectLoading, selectError } = cryptoFeature;

export const selectFavoriteCoins = createSelector(
  selectCoins,
  selectFavorites,
  (coins, favorites) => coins.filter((c) => favorites.includes(c.id))
);
