import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCore from './core/core.reducer';
import * as fromUi from './ui/ui.reducer';

export interface State {
  core: fromCore.State;
  ui: fromUi.State;
}

export const reducers: ActionReducerMap<State> = {
  core: fromCore.coreReducer,
  ui: fromUi.uiReducer,
};

export const getCoreState = createFeatureSelector<fromCore.State>('core');
export const getCoreUser = createSelector(getCoreState, fromCore.getUser);
export const getCoreLoading = createSelector(getCoreState, fromCore.getLoading);
export const getCoreError = createSelector(getCoreState, fromCore.getError);

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getUiIsSidenavOpen = createSelector(getUiState, fromUi.getIsSidenavOpen);
