import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';

import * as TodoActions from './todo.actions';
import {TodoService} from '../../todo.service';
import {AppState} from '../index';

@Injectable()
export class TodosEffects {
    curFilter;

    @Effect()
    loadList$: Observable<Action> = this.actions$.pipe(
        ofType<TodoActions.TodosActionTypes>(TodoActions.TodosActions.LOAD_TODOS),
        mergeMap((action) => {
                let filter;

                if (!action.payload) {
                    this.curFilter.subscribe(_filter => filter = _filter);
                    console.log('filter', filter);
                } else {
                    filter = action.payload;
                }

                return this.todoService.getTodoList(filter)
                    .pipe(
                        map((resp) => new TodoActions.GetTodosSuccess(resp)),
                        catchError((error) => of(new TodoActions.GetTodosFailed(error)))
                    );
            }
        )
    );

    @Effect()
    addTodo$ = this.actions$.pipe(
        ofType<TodoActions.TodosActionTypes>(TodoActions.TodosActions.ADD_TODO),
        mergeMap((action) => {
                return this.todoService.saveTodo(action.payload)
                    .pipe(
                        map((resp) => new TodoActions.GetTodos())
                    );
                }
        )
    );

    @Effect()
     removeTodo$ = this.actions$.pipe(
        ofType<TodoActions.TodosActionTypes>(TodoActions.TodosActions.REMOVE_TODO),
        mergeMap((action) => {
                return this.todoService.deleteTodo(action.payload)
                    .pipe(
                        map((resp) => new TodoActions.GetTodos())
                    );
            }
        )
    );

    @Effect()
    updateTodo$ = this.actions$.pipe(
        ofType<TodoActions.TodosActionTypes>(TodoActions.TodosActions.UPDATE_TODO),
        mergeMap((action) => {
                return this.todoService.updateTodo(action.payload.id, action.payload)
                    .pipe(
                        map((resp) => new TodoActions.GetTodos())
                    );
            }
        )
    );

    @Effect()
    removeCompletedTodos$ = this.actions$.pipe(
        ofType<TodoActions.TodosActionTypes>(TodoActions.TodosActions.REMOVE_COMPLETED_TODOS),
        mergeMap((action) => {
                return this.todoService.removeAllCompleted()
                    .pipe(
                        map((resp) => new TodoActions.GetTodos())
                    );
            }
        )
    );



    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private todoService: TodoService) {

        this.curFilter = this.store.select('filter');

    }
}
