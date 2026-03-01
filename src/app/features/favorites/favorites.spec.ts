import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Favorites } from './favorites';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { CryptoActions } from '../../store/crypto.actions';
import { selectFavoriteCoins } from '../../store/crypto.selectors';
import { vi } from 'vitest';

describe('Favorites Component', () => {
  let component: Favorites;
  let fixture: ComponentFixture<Favorites>;
  let store: MockStore;

  const initialState = {
    crypto: { favorites: [] },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favorites],
      providers: [provideMockStore({ initialState }), provideRouter([])],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(Favorites);
    component = fixture.componentInstance;

    store.overrideSelector(selectFavoriteCoins, []);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch toggleFavorite action when toggleFavorite() is called', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const testId = 'bitcoin';

    component.toggleFavorite(testId);

    expect(dispatchSpy).toHaveBeenCalledWith(CryptoActions.toggleFavorite({ id: testId }));
  });

  describe('getSparklinePath()', () => {
    it('should return empty string if prices are undefined or empty', () => {
      expect(component.getSparklinePath(undefined)).toBe('');
      expect(component.getSparklinePath([])).toBe('');
    });

    it('should calculate SVG path string based on prices', () => {
      const prices = [10, 30, 50];
      const path = component.getSparklinePath(prices);
      expect(path).toBe('M 0 40 L 60 20 L 120 0');
    });
  });
});
