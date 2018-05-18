import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Actions, Effect } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as CoreActions from './core.actions';
import { User } from '../models/user.model';
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

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
      this.router.navigate(['/welcome']);
      return new CoreActions.Authenticated(currentUser);
    }),
    catchError(err => of(new CoreActions.Error(err))),
  );

  @Effect()
  register$ = this.actions$.ofType(CoreActions.REGISTER).pipe(
    map((action: CoreActions.Register) => action.payload),
    switchMap((authData: { username: string, password: string }) => from(this.afAuth.auth.createUserWithEmailAndPassword(
      authData.username,
      authData.password,
    ))),
    switchMap(credential => {
      console.log(credential);
      return this.afs.doc(`users/${credential.user.uid}`).set({
        uid: credential.user.uid,
        displayName: 'Something',
        photoURL: '',
        email: '',
        roles: {
          admin: false,
          jumper: false,
          manager: false,
          user: true,
        },
      });
    }),
    map(credential => new CoreActions.Authenticate()),
    catchError(err => of(new CoreActions.Error(err))),
  );

  @Effect()
  login$ = this.actions$.ofType(CoreActions.LOGIN).pipe(
    map((action: CoreActions.Login) => action.payload),
    switchMap((authData: { username: string, password: string }) => from(this.afAuth.auth.signInWithEmailAndPassword(
      authData.username,
      authData.password,
    ))),
    map(credential => new CoreActions.Authenticate()),
    catchError(err => of(new CoreActions.Error(err))),
  );

  @Effect()
  logout$ = this.actions$.ofType(CoreActions.LOGOUT).pipe(
    map((action: CoreActions.Logout) => action.payload),
    switchMap(payload => of(this.afAuth.auth.signOut())),
    map(() => new CoreActions.NotAuthenticated()),
    catchError(err => of(new CoreActions.Error(err))),
  );

  @Effect({dispatch: false})
  error$ = this.actions$.ofType(CoreActions.ERROR).pipe(
    map((action: CoreActions.Error) => action.payload),
    tap(payload => {
      console.log(payload);
      this.snackBar.open(payload.message);
    }),
  );

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private router: Router,
    private actions$: Actions,
  ) {}

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }
}
