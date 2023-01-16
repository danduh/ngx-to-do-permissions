import { reducer, TodoState } from './todos/todo.reducer';
import { reducerFilter } from './filter/reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userPermissionsReducer } from './auth/auth.reducer';

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
export const isPermittedState = (required: string) => createSelector(
  userPermissionsState,
  (userPerms) => {
    const [ feature, action ] = required.split('_');
    if (!userPerms.hasOwnProperty(feature)) {
      return false;
    }

    if (!userPerms[feature].hasOwnProperty(action)) {
      return false;
    }

    // TODO<Daniel> implementation of property based required
    if (userPerms[feature][action] !== '*') {
      return false;
    }

    return true;
  }
);

export const userPermissionsSelector = createSelector(userPermissionsState, (state) => state.userPermissions);
