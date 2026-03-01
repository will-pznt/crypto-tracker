import { CryptoActions } from './crypto.actions';
import { cryptoFeature, initialState } from './crypto.reducer';

const cryptoReducer = cryptoFeature.reducer;

describe('Crypto Reducer', () => {
  it('should return default state', () => {
    const action = { type: 'Unknown' } as any;
    const state = cryptoReducer(initialState, action);
    expect(state).toBe(initialState);
  });

  it('should toggle favorite (add)', () => {
    const action = CryptoActions.toggleFavorite({ id: 'bitcoin' });
    const state = cryptoReducer({ ...initialState, favorites: [] }, action);
    expect(state.favorites).toContain('bitcoin');
  });

  it('should toggle favorite (remove)', () => {
    const action = CryptoActions.toggleFavorite({ id: 'bitcoin' });
    const state = cryptoReducer({ ...initialState, favorites: ['bitcoin'] }, action);
    expect(state.favorites).not.toContain('bitcoin');
  });
});
