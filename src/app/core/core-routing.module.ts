import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const coreRouting: Routes = [
];

@NgModule({
  imports: [
    RouterModule.forChild(coreRouting)
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule {

}