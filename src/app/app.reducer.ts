import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCore from './core/core.reducer';

export interface State {
  core: fromCore.State;
}

export const reducers: ActionReducerMap<State> = {
  core: fromCore.coreReducer,
};

export const getCoreState = createFeatureSelector<fromCore.State>('core');
export const getCoreUser = createSelector(getCoreState, fromCore.getUser);
export const getCoreLoading = createSelector(getCoreState, fromCore.getLoading);
export const getCoreError = createSelector(getCoreState, fromCore.getError);
