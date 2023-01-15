import { Todo } from '../../todo';
import * as TodoActions from './todo.actions';

export interface TodoState {
  todos: Todo[];
  metadata: any;
}

const initialState = {
  todos: [],
  metadata: null
};

export function reducer(state: TodoState = initialState, action): TodoState {

  switch (action.type) {
    case TodoActions.loadTodosSuccess.type:
      return action.payload;
    default:
      return state;
  }
}
