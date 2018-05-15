import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Actions, Effect } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as CoreActions from './core.actions';
import { User } from '../models/user.model';
import * as firebase from 'firebase';

@Injectable()
export class CoreEffects {

  @Effect()
  authenticate$ = this.actions$.ofType(CoreActions.AUTHENTICATE).pipe(
    map((action: CoreActions.Authenticate) => action.payload),
    switchMap(payload => of(this.afAuth.auth)),
    tap(auth => {
      console.log(auth);
      return auth;
    }),
    map(auth => {
      if (auth.currentUser) {
        return new CoreActions.FetchUser(auth.currentUser.uid);
      } else {
        return new CoreActions.NotAuthenticated();
      }
    }),
    catchError(err => {
      console.log(err);
      return of(new CoreActions.Error(err));
    }),
  );

  @Effect()
  fetchUser$ = this.actions$.ofType(CoreActions.FETCH_USER).pipe(
    map((action: CoreActions.FetchUser) => action.payload),
    switchMap((uid: string) => this.afs.doc<User>(`users/${uid}`).valueChanges()),
    map((currentUser: User) => {
      /*
      const currentUser: User = {
        uid: uid,
        displayName: 'John Baker',
        roles: {
          admin: true,
          manager: false,
          user: false,
          jumper: false,
        },
      };
      */
      return new CoreActions.Authenticated(currentUser);
    }),
    catchError(err => of(new CoreActions.Error(err))),
  );

  @Effect()
  login$ = this.actions$.ofType(CoreActions.LOGIN).pipe(
    map((action: CoreActions.Logout) => action.payload),
    switchMap(payload => from(this.googleLogin())),
    map(credential => new CoreActions.Authenticate()),
  );

  @Effect()
  logout$ = this.actions$.ofType(CoreActions.LOGOUT).pipe(
    map((action: CoreActions.Logout) => action.payload),
    switchMap(payload => of(this.afAuth.auth.signOut())),
    map(() => new CoreActions.NotAuthenticated()),
    catchError(err => of(new CoreActions.Error(err))),
  );

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private actions$: Actions,
  ) {}

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }
}
