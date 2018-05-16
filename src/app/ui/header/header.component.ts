import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import * as UiActions from '../ui.actions';
import * as CoreActions from '../../core/core.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() authenticated = false;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {}

  onOpenSidenav() {
    this.store.dispatch(new UiActions.SetSidenavOpen());
  }

  onLogout() {
    this.store.dispatch(new CoreActions.Logout());
  }

}
