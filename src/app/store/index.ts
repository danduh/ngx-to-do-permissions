import {reducer, TodoState} from './todos/todo.reducer';
import {reducerFilter} from './filter/reducer';

import {Todo} from '../todo';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {userPermissionsReducer} from './auth/auth.reducer';

export interface AppState {
    todoState: TodoState;
    filter: string;
    userPermissions: any;
}


export const reducers = {
    todoState: reducer,
    filter: reducerFilter,
    userPermissions: userPermissionsReducer
};

export const todoStateSelector = createFeatureSelector<TodoState>('todoState');

export const todosListSelector = createSelector(todoStateSelector, (state) => state.todos);

export const metadataSelector = createSelector(todoStateSelector, (state) => state.metadata);


export const userPermissionsState = createFeatureSelector<AppState>('userPermissions');
export const userPermissionsSelector = createSelector(userPermissionsState, (state) => state.userPermissions);
