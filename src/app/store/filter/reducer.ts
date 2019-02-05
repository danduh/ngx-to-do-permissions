import {FiltersActionsTypes, FiltersActions} from './actions';

export function reducerFilter(state: string = 'ALL', action: FiltersActionsTypes) {
    switch (action.type) {
        case FiltersActions.UPDATE_FILTER:
            return action.payload;
        default:
            return state;

    }

}
