import {Action} from '@ngrx/store';

export enum AuthActions {
    GET_USER_PERMISSIONS = '[AUTH] Load user\'s permissions'
}


export class GetUsersAuthAction implements Action {
    readonly type = AuthActions.GET_USER_PERMISSIONS;

    constructor(public payload?: {}) {
    }
}
