import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetaEditPage } from './receta-edit.page';

const routes: Routes = [
  {
    path: '',
    component: RecetaEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetaEditPageRoutingModule {}
