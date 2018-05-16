import { Action } from '@ngrx/store';

export const SET_SIDENAV_OPEN = '[Ui] Set Sidenav Open';
export const SET_SIDENAV_CLOSED = '[Ui] Set Sidenav Closed';

export class SetSidenavOpen implements Action {
  readonly type = SET_SIDENAV_OPEN;
}

export class SetSidenavClosed implements Action {
  readonly type = SET_SIDENAV_CLOSED;
}

export type CoreActions = SetSidenavOpen | SetSidenavClosed;
