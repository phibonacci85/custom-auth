import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';

import * as fromApp from '../../../app.reducer';
import * as CoreActions from '../../core.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.theme.scss',
    './login.component.scss',
  ],
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<fromApp.State>,
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromApp.getCoreLoading);
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(new CoreActions.Login({
      username: form.value.email,
      password: form.value.password,
    }));
  }

}
