import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatoPrincipalPage } from './plato-principal.page';

const routes: Routes = [
  {
    path: '',
    component: PlatoPrincipalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatoPrincipalPageRoutingModule {}
