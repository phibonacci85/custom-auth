import { CoreActions, SET_SIDENAV_OPEN, SET_SIDENAV_CLOSED } from './ui.actions';

export interface State {
  isSidenavOpen: boolean;
}

const initialState: State = {
  isSidenavOpen: false
};

export function uiReducer(state = initialState, action: CoreActions) {
  switch (action.type) {
    case SET_SIDENAV_OPEN:
      return {
        isSidenavOpen: true
      };
    case SET_SIDENAV_CLOSED:
      return {
        isSidenavOpen: false
      };
    default:
      return state;
  }
}

export const getIsSidenavOpen = (state: State) => state.isSidenavOpen;
