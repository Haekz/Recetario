import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetaAddPage } from './receta-add.page';

const routes: Routes = [
  {
    path: '',
    component: RecetaAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetaAddPageRoutingModule {}
