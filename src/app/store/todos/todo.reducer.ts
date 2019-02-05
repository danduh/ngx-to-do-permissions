import {Todo} from '../../todo';

import {TodosActionTypes, TodosActions} from './todo.actions';

export interface TodoState {
    todos: Todo[];
    metadata: any
}
const initialState = {
    todos:[],
    metadata: null
}

export function reducer(state: TodoState = initialState, action: TodosActionTypes) {

    switch (action.type) {
        case TodosActions.LOAD_TODOS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
