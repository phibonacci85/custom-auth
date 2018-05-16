import { Component, Input, OnInit } from '@angular/core';

import * as fromRoot from '../../app.reducer';
import * as UiActions from '../ui.actions';
import * as CoreActions from '../../core/core.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  @Input() authenticated = false;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() { }

  onCloseSidenav() {
    this.store.dispatch(new UiActions.SetSidenavClosed());
  }

  onLogout() {
    this.store.dispatch(new UiActions.SetSidenavClosed());
    this.store.dispatch(new CoreActions.Logout());
  }
}
