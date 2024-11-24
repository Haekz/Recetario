import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnsaladasPage } from './ensaladas.page';

const routes: Routes = [
  {
    path: '',
    component: EnsaladasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnsaladasPageRoutingModule {}
