import { createAction, props } from '@ngrx/store';
import { TodoState } from './todo.reducer';
import { BaseTodo, Todo } from '../../todo';

export const loadTodos = createAction('[TODO] Load', props<{ payload?: string }>());
export const loadTodosSuccess = createAction('[TODO] Load Success', props<{ payload: TodoState }>());
export const loadTodosFailed = createAction('[TODO] Load Failed', props<{ payload: any }>());

export const addTodo = createAction('[TODO] Add', props<{ payload: BaseTodo }>());
export const removeTodo = createAction('[TODO] Remove', props<{ payload: number }>());
export const updateTodo = createAction('[TODO] Update', props<{ payload: Todo }>());
export const removeCompletedTodos = createAction('[TODO] Remove Completed');

export type TodosActionTypes =
  | typeof loadTodos
  | typeof loadTodosSuccess
  | typeof loadTodosFailed
  | typeof addTodo
  | typeof removeTodo
  | typeof updateTodo
  | typeof removeCompletedTodos;
