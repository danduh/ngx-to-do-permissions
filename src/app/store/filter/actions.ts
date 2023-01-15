import { createAction, props } from '@ngrx/store';

export const updateFilter = createAction('[FILTER] Update', props<{ payload: string }>());

export type FiltersActionsTypes = typeof updateFilter;
