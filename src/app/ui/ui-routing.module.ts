import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from '../core/auth/login/login.component';
import { RegisterComponent } from '../core/auth/register/register.component';

const uiRouting: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(uiRouting)
  ],
  exports: [
    RouterModule
  ]
})
export class UiRoutingModule {

}
