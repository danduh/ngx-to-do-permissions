import { Action } from '@ngrx/store';

export enum FiltersActions {
    UPDATE_FILTER = '[FILTER] Update'
}


export class UpdateFilter implements Action {
    readonly type = FiltersActions.UPDATE_FILTER;

    constructor(public payload: string) {}
}


export type FiltersActionsTypes = UpdateFilter ;
