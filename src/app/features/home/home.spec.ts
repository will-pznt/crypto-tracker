import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectCoins, selectFavorites, selectLoading } from '../../store/crypto.selectors';
import { CryptoActions } from '../../store/crypto.actions';
import { Coin } from '../../models/crypto.model';
import { vi } from 'vitest';

describe('Home Component', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let store: MockStore;

  const mockCoins: Coin[] = Array.from({ length: 30 }).map((_, index) => ({
    id: `coin-${index}`,
    symbol: `c${index}`,
    name: `Test Coin ${index}`,
    image: `img${index}.png`,
    current_price: 100,
    market_cap: 1000,
    total_volume: 500,
    price_change_percentage_1h_in_currency: 1,
    price_change_percentage_24h_in_currency: 2,
    price_change_percentage_7d_in_currency: 3,
  }));

  const mockFavorites = ['coin-1', 'coin-2'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;

    store.overrideSelector(selectLoading, false);
    store.overrideSelector(selectCoins, mockCoins);
    store.overrideSelector(selectFavorites, mockFavorites);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadCoins on ngOnInit', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(CryptoActions.loadCoins());
  });

  describe('Pagination & Filtering', () => {
    it('should calculate total pages correctly based on 24 items per page', () => {
      expect(component.totalPages).toBe(2);
    });

    it('should return 24 items for the first page', () => {
      expect(component.pagedCoins.length).toBe(24);
      expect(component.pagedCoins[0].id).toBe('coin-0');
    });

    it('should return remaining 6 items on the next page', () => {
      component.nextPage();
      expect(component.currentPage).toBe(2);
      expect(component.pagedCoins.length).toBe(6);
    });

    it('should not go below page 1 on prevPage()', () => {
      component.currentPage = 1;
      component.prevPage();
      expect(component.currentPage).toBe(1);
    });

    it('should reset to page 1 when search changes', () => {
      component.currentPage = 2;
      component.onSearchChange();
      expect(component.currentPage).toBe(1);
    });

    it('should filter coins based on search term', () => {
      component.searchTerm = 'Test Coin 5';
      expect(component.pagedCoins.length).toBe(1);
      expect(component.pagedCoins[0].name).toBe('Test Coin 5');
    });
  });

  describe('Favorites Handling', () => {
    it('should accurately identify favorite status based on cache', () => {
      expect(component.isFavorite('coin-1')).toBe(true);
      expect(component.isFavorite('coin-99')).toBe(false);
    });

    it('should dispatch toggleFavorite action', () => {
      const dispatchSpy = vi.spyOn(store, 'dispatch');

      component.toggleFavorite('coin-1');

      expect(dispatchSpy).toHaveBeenCalledWith(CryptoActions.toggleFavorite({ id: 'coin-1' }));
    });
  });
});
