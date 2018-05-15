import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from './app.reducer';
import * as CoreActions from './core/core.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user$: Observable<User>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit() {
    this.user$ = this.store.select(fromApp.getCoreUser);
    this.loading$ = this.store.select(fromApp.getCoreLoading);
    this.error$ = this.store.select(fromApp.getCoreError);
    this.store.dispatch(new CoreActions.Authenticate());
  }

  logout() {
    this.store.dispatch(new CoreActions.Logout());
  }
}
