import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CryptoActions } from './crypto.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CryptoService } from '../services/crypto.service';

@Injectable()
export class CryptoEffects {
  private actions$ = inject(Actions);
  private cryptoService = inject(CryptoService);

  loadCoins$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CryptoActions.loadCoins),
      mergeMap(() =>
        this.cryptoService.getCoins().pipe(
          map((coins) => CryptoActions.loadCoinsSuccess({ coins })),
          catchError((error) => of(CryptoActions.loadCoinsFailure({ error: error.message })))
        )
      )
    )
  );
}
