import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { CryptoEffects } from './store/crypto.effects';
import { cryptoFeature } from './store/crypto.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({ [cryptoFeature.name]: cryptoFeature.reducer }),
    provideEffects([CryptoEffects]),
    provideHttpClient(),
  ],
};
