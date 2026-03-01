import { createFeature, createReducer, on } from '@ngrx/store';
import { CryptoActions } from './crypto.actions';
import { Coin } from '../models/crypto.model';

export interface CryptoState {
  coins: Coin[];
  favorites: string[];
  loading: boolean;
  error: string | null;
}

export const initialState: CryptoState = {
  coins: [],
  favorites: JSON.parse(localStorage.getItem('favorites_coins') || '[]'),
  loading: false,
  error: null,
};

export const cryptoFeature = createFeature({
  name: 'crypto',
  reducer: createReducer(
    initialState,
    on(CryptoActions.loadCoins, (state) => ({ ...state, loading: true })),
    on(CryptoActions.loadCoinsSuccess, (state, { coins }) => ({ ...state, coins, loading: false })),
    on(CryptoActions.loadCoinsFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(CryptoActions.toggleFavorite, (state, { id }) => {
      const isFav = state.favorites.includes(id);
      const newFavorites = isFav
        ? state.favorites.filter((fav) => fav !== id)
        : [...state.favorites, id];
      localStorage.setItem('favorites_coins', JSON.stringify(newFavorites));
      return { ...state, favorites: newFavorites };
    })
  ),
});
