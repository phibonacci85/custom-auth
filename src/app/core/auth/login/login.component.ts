import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../app.reducer';
import * as CoreActions from '../../core.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loading$: Observable<boolean>;

  constructor(private store: Store<fromApp.State>) { }

  ngOnInit() {
    this.loading$ = this.store.select(fromApp.getCoreLoading);
  }

  login() {
    this.store.dispatch(new CoreActions.Login());
  }
}
