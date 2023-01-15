import * as  FiltersActionsTypes from './actions';

export function reducerFilter(state: string = 'ALL', action){
  switch (action.type) {
    case FiltersActionsTypes.updateFilter.type:
      return action.payload;
    default:
      return state;

  }

}
