import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { CryptoActions } from '../../store/crypto.actions';
import { selectCoins, selectFavorites, selectLoading } from '../../store/crypto.selectors';
import { Coin } from '../../models/crypto.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private store = inject(Store);

  loading$ = this.store.select(selectLoading);
  allCoins$ = this.store.select(selectCoins);
  favorites$ = this.store.select(selectFavorites);

  searchTerm = '';

  private coinsCache: Coin[] = [];
  private favIdsCache: string[] = [];

  currentPage = 1;
  itemsPerPage = 24;

  ngOnInit() {
    this.store.dispatch(CryptoActions.loadCoins());
    this.allCoins$.subscribe((coins) => (this.coinsCache = coins));
    this.favorites$.subscribe((favs) => (this.favIdsCache = favs));
  }

  get pagedCoins(): Coin[] {
    const filtered = this.coinsCache.filter((coin) =>
      coin.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    const filteredCount = this.coinsCache.filter((coin) =>
      coin.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).length;
    return Math.ceil(filteredCount / this.itemsPerPage) || 1;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  onSearchChange() {
    this.currentPage = 1;
  }

  isFavorite(id: string): boolean {
    return this.favIdsCache.includes(id);
  }

  toggleFavorite(id: string) {
    this.store.dispatch(CryptoActions.toggleFavorite({ id }));
  }
}
