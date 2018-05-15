import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export const AUTHENTICATE = '[Core] Authenticate';
export const NOT_AUTHENTICATED = '[Core] Not Authenticated';
export const FETCH_USER = '[Core] Fetch User';
export const AUTHENTICATED = '[Core] Authenticated';
export const LOGIN = '[Core] Login';
export const LOGOUT = '[Core] Logout';
export const ERROR = '[Core] Error';

export class Authenticate implements Action {
  readonly type = AUTHENTICATE;

  constructor(public payload?: any) {}
}

export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;

  constructor(public payload?: any) {}
}

export class FetchUser implements Action {
  readonly type = FETCH_USER;

  constructor(public payload: string) {}
}

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;

  constructor(public payload: User) {}
}

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload?: any) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;

  constructor(public payload?: any) {}
}

export class Error implements Action {
  readonly type = ERROR;

  constructor(public payload: any) {}
}

export type All = Authenticate | NotAuthenticated | FetchUser | Authenticated | Logout | Error;
