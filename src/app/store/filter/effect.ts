import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { loadTodos } from '../todos/todo.actions';
import { Injectable } from '@angular/core';

import { AppState } from '../index';
import { updateFilter } from './actions';

@Injectable()
export class FilterEffects {
  changeFilter$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateFilter),
        map((action) => {
          console.log('action', action);
          this.store.dispatch(loadTodos({ payload: action.payload }));
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private store: Store<AppState>) {}
}
