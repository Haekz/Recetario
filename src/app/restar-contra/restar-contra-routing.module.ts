import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestarContraPage } from './restar-contra.page';

const routes: Routes = [
  {
    path: '',
    component: RestarContraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestarContraPageRoutingModule {}
