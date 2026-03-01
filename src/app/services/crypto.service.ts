import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coin } from '../models/crypto.model';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class CryptoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.coingecko.com/api/v3/coins';
  private apiKey = environment.x_cg_demo_api_key;

  getCoins(): Observable<Coin[]> {
    const url = `${this.apiUrl}/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d&x_cg_demo_api_key=${this.apiKey}`;
    return this.http.get<Coin[]>(url);
  }
}
