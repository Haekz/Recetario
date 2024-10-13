import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetaListPage } from './receta-list.page';

const routes: Routes = [
  {
    path: '',
    component: RecetaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetaListPageRoutingModule {}
