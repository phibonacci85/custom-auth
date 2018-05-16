import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';

import * as fromApp from '../../../app.reducer';
import * as CoreActions from '../../core.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register-theme.scss',
    './register.component.scss',
  ],
})
export class RegisterComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<fromApp.State>,
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromApp.getCoreLoading);
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(new CoreActions.Register({
      username: form.value.email,
      password: form.value.password,
    }));
  }
}
