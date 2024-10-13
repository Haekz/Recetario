import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetaAllPage } from './receta-all.page';

const routes: Routes = [
  {
    path: '',
    component: RecetaAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetaAllPageRoutingModule {}
