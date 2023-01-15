import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as TodoActions from './todo.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../index';
import { TodoService } from '../../todo.service';


@Injectable()
export class TodosEffects {
  curFilter;

  loadList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      switchMap((action) => {
        let filter;
        if (!action.payload) {
          this.curFilter.subscribe((_filter) => (filter = _filter));
        } else {
          filter = action.payload;
        }
        return this.todoService.getTodoList(filter).pipe(
          map((resp) => TodoActions.loadTodosSuccess({payload: resp})),
          catchError((error) => of(TodoActions.loadTodosFailed({payload: error})))
        );
      })
    )
  );

  addTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.addTodo),
        switchMap((action) => {
            console.log(action);
            return this.todoService.saveTodo(action.payload)
              .pipe(map(() => {
                console.log('addTodo$');
                return TodoActions.loadTodos({});
              }));
          }
        )
      )
  );

  removeTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.removeTodo),
        switchMap((action) =>
          this.todoService.deleteTodo(action.payload).pipe(map(() => TodoActions.loadTodos({})))
        )
      )
  );

  updateTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.updateTodo),
        switchMap((action) =>
          this.todoService
            .updateTodo(action.payload.id, action.payload)
            .pipe(map(() => TodoActions.loadTodos({})))
        )
      )
  );

  removeCompletedTodos$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.removeCompletedTodos),
        switchMap(() =>
          this.todoService.removeAllCompleted().pipe(map(() => TodoActions.loadTodos({})))
        )
      )
  );

  constructor(private actions$: Actions, private store: Store<AppState>, private todoService: TodoService){
    this.curFilter = this.store.select((state) => state.filter);
  }
}
