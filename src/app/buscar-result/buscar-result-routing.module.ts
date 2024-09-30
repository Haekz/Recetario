import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarResultPage } from './buscar-result.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarResultPageRoutingModule {}
