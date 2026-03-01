import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { selectFavoriteCoins } from '../../store/crypto.selectors';
import { CryptoActions } from '../../store/crypto.actions';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.html',
})
export class Favorites implements OnInit {
  private store = inject(Store);

  favoriteCoins$ = this.store.select(selectFavoriteCoins);

  ngOnInit() {
    this.store.dispatch(CryptoActions.loadCoins());
  }

  toggleFavorite(id: string) {
    this.store.dispatch(CryptoActions.toggleFavorite({ id }));
  }

  getSparklinePath(prices: number[] | undefined): string {
    if (!prices || prices.length === 0) return '';
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;
    const width = 120;
    const height = 40;

    return prices
      .map((price, index) => {
        const x = (index / (prices.length - 1)) * width;
        const y = height - ((price - min) / range) * height;
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  }
}
