import { User } from '../models/user.model';

import * as CoreActions from './core.actions';

export interface State {
  user: User;
  loading: boolean;
  error: any;
}

const initialState: State = {
  user: null,
  loading: false,
  error: null,
};

export function coreReducer(state = initialState, action: CoreActions.All) {
  switch (action.type) {
    case CoreActions.AUTHENTICATE:
      return {
        ...state,
        loading: true,
      };
    case CoreActions.NOT_AUTHENTICATED:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case CoreActions.AUTHENTICATED:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case CoreActions.REGISTER:
      return {
        ...state,
        loading: true,
      };
    case CoreActions.LOGIN:
      return {
        ...state,
        loading: true,
      };
    case CoreActions.LOGOUT:
      return {
        ...state,
        loading: true,
      };
    case CoreActions.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const getUser = (state: State) => state.user;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
