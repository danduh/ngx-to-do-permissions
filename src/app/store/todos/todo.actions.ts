import {Action} from '@ngrx/store';
import {Todo, BaseTodo} from '../../todo';
import {TodoState} from "./todo.reducer";


export enum TodosActions {
    LOAD_TODOS = '[TODO] Load',
    LOAD_TODOS_SUCCESS = '[TODO] Load Success',
    LOAD_TODOS_FAILED = '[TODO] Load Failed',

    ADD_TODO = '[TODO] Add',
    UPDATE_TODO = '[TODO] Update',
    REMOVE_TODO = '[TODO] Remove',
    REMOVE_COMPLETED_TODOS = '[TODO] Remove Completed'
}

export class GetTodos implements Action {
    readonly type = TodosActions.LOAD_TODOS;

    constructor(public payload?: string) {
    }
}

export class GetTodosSuccess implements Action {
    readonly type = TodosActions.LOAD_TODOS_SUCCESS;

    constructor(public payload: TodoState) {
    }
}

export class GetTodosFailed implements Action {
    readonly type = TodosActions.LOAD_TODOS_FAILED;

    constructor(public payload: any) {
    }
}

export class AddTodo implements Action {
    readonly type = TodosActions.ADD_TODO;

    constructor(public payload: BaseTodo) {
    }
}

export class RemoveTodo implements Action {
    readonly type = TodosActions.REMOVE_TODO;

    constructor(public payload: number) {

    }
}

export class UpdateTodo implements Action {
    readonly type = TodosActions.UPDATE_TODO;

    constructor(public payload: Todo) {

    }
}

export class RemoveCompletedTodos implements Action {
    readonly type = TodosActions.REMOVE_COMPLETED_TODOS;

    constructor(public payload?: any) {

    }
}

export type TodosActionTypes = GetTodos | GetTodosSuccess | GetTodosFailed | AddTodo | RemoveTodo | UpdateTodo | RemoveCompletedTodos;
